
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClinicContentService } from '../../services/clinic-content.service';
import { AppointmentComponent } from '../../sections/appointment/appointment.component';
import { FooterComponent } from '../../sections/footer/footer.component';
import { ActivatedRoute, Router,RouterLink } from "@angular/router";
import { NavbarComponent } from '../../sections/navbar/navbar.component';

import { ScrollRevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';
import { map, Observable } from 'rxjs';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  slug: string;
  readTime: string;
}


@Component({
  selector: 'app-blog',
imports: [
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    AppointmentComponent,
    ScrollRevealDirective,
    RouterLink
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {
private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();
constructor(
    private router: Router
  ) {
   
  }

// Maps the content stream to the full array of blog posts
readonly posts$: Observable<any[]> = this.clinicContent.getContent().pipe(
  map(content => content.blogPosts || [])
);


}
