import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ClinicContentService } from '../../services/clinic-content.service';
import { AppointmentComponent } from '../../sections/appointment/appointment.component';
import { FooterComponent } from '../../sections/footer/footer.component';
import { NavbarComponent } from '../../sections/navbar/navbar.component';
import { ScrollRevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-blog-detail',
  imports: [
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    AppointmentComponent,
    ScrollRevealDirective,
    RouterLink
  ],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogDetailComponent {
private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();

  private readonly route = inject(ActivatedRoute);

  // 1. Get the slug synchronously from the current route snapshot
  readonly slug = this.route.snapshot.paramMap.get('slug');

  // 2. Stream the specific blog post by filtering the content observable
  readonly post$: Observable<any> = this.clinicContent.getContent().pipe(
    map(content => content.blogPosts.find((x: any) => x.slug === this.slug))
  );
}
