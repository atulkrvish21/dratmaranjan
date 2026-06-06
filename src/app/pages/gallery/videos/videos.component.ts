
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClinicContentService } from 'src/app/services/clinic-content.service';
import { AppointmentComponent } from 'src/app/sections/appointment/appointment.component';
import { FooterComponent } from 'src/app/sections/footer/footer.component';

import { NavbarComponent } from 'src/app/sections/navbar/navbar.component';

import { ScrollRevealDirective } from 'src/app/shared/scroll-reveal/scroll-reveal.directive';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
}

@Component({
  selector: 'app-videos',
imports: [
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    AppointmentComponent,
    ScrollRevealDirective
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideosComponent {
 private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();

  constructor(private sanitizer: DomSanitizer) {}

  selectedVideo?: VideoItem;
  videoUrl?: SafeResourceUrl;

  videos: VideoItem[] = [
    {
      id: '-X2mbipVxqE',
      title: 'Endoscopic Spine Surgery',
      thumbnail: 'https://img.youtube.com/vi/-X2mbipVxqE/maxresdefault.jpg'
    },
    {
      id: '33pFUXUPgZU',
      title: 'Brain Tumor Treatment',
      thumbnail: 'https://img.youtube.com/vi/33pFUXUPgZU/maxresdefault.jpg'
    },
    {
      id: 'w3vn5k3mGTg',
      title: 'Stroke Emergency Care',
      thumbnail: 'https://img.youtube.com/vi/w3vn5k3mGTg/maxresdefault.jpg'
    }
  ];

  openVideo(video: VideoItem): void {

    this.selectedVideo = video;

    this.videoUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`
      );

    document.body.style.overflow = 'hidden';
  }

  closeVideo(): void {

    this.selectedVideo = undefined;
    this.videoUrl = undefined;

    document.body.style.overflow = 'auto';
  }
}
