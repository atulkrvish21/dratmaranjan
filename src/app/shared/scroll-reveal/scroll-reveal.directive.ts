import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  Renderer2,
  inject
} from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  @Input() appScrollRevealDelay = 0;
  @Input() appScrollRevealDirection: 'left' | 'right' = 'left';
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    this.renderer.addClass(element, 'app-reveal');

      this.renderer.addClass(
            element,
            this.appScrollRevealDirection === 'left'
              ? 'app-reveal-left'
              : 'app-reveal-right'
          );

    if (this.appScrollRevealDelay > 0) {
      this.renderer.setStyle(element, 'transition-delay', `${this.appScrollRevealDelay}ms`);
    }

    if (!('IntersectionObserver' in window)) {
      this.reveal(element);
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.reveal(element);
              this.observer?.unobserve(element);
            }
          }
        },
        {
          root: null,
          rootMargin: '0px 0px -12% 0px',
          threshold: 0.16
        }
      );

      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private reveal(element: HTMLElement): void {
    this.renderer.addClass(element, 'app-reveal-visible');
  }
}
