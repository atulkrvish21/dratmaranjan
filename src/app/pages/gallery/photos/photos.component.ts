
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClinicContentService } from 'src/app/services/clinic-content.service';
import { AppointmentComponent } from 'src/app/sections/appointment/appointment.component';
import { FooterComponent } from 'src/app/sections/footer/footer.component';

import { NavbarComponent } from 'src/app/sections/navbar/navbar.component';

import { ScrollRevealDirective } from 'src/app/shared/scroll-reveal/scroll-reveal.directive';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: string;
}
@Component({
  selector: 'app-photos',
imports: [
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    ScrollRevealDirective,
    AppointmentComponent
  ],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosComponent {
 private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();
  selectedCategory = 'all';

  categories = [
    'all',
    'hospital',
    'surgery',
    'events',
    'awards',
    'patients'
  ];

  gallery: GalleryItem[] = [
    {
      id: 1,
      image: 'https://dratmaranjandash.com/wp-content/uploads/2026/04/504378889_1136688165147699_1542191122622074238_n.webp',
      title: 'Operation Theatre',
      category: 'hospital'
    },
    {
      id: 2,
      image: 'https://dratmaranjandash.com/wp-content/uploads/2026/04/504381826_1133455388804310_209206004215841441_n.webp',
      title: 'Spine Surgery',
      category: 'surgery'
    },
    {
      id: 3,
      image: 'https://dratmaranjandash.com/wp-content/uploads/2026/04/505667248_1136688821814300_1702982394942090808_n.webp',
      title: 'Medical Conference',
      category: 'events'
    },
    {
      id: 4,
      image: 'https://dratmaranjandash.com/wp-content/uploads/2026/04/511200511_1128182065998309_1063018742252640477_n.webp',
      title: 'Award Ceremony',
      category: 'awards'
    }
  ];
selectedImage: string | null = null;
selectedTitle = '';


closeImage(): void {
  this.selectedImage = null;
  this.selectedTitle = '';

  document.body.style.overflow = 'auto';
}


selectedIndex = 0;

openImage(index: number): void {
  this.selectedIndex = index;
  this.selectedImage = this.filteredGallery[index].image;
  this.selectedTitle = this.filteredGallery[index].title;
}

nextImage(): void {
  this.selectedIndex =
    (this.selectedIndex + 1) % this.filteredGallery.length;

  this.selectedImage =
    this.filteredGallery[this.selectedIndex].image;

  this.selectedTitle =
    this.filteredGallery[this.selectedIndex].title;
}

previousImage(): void {
  this.selectedIndex =
    (this.selectedIndex - 1 + this.filteredGallery.length) %
    this.filteredGallery.length;

  this.selectedImage =
    this.filteredGallery[this.selectedIndex].image;

  this.selectedTitle =
    this.filteredGallery[this.selectedIndex].title;
}


  get filteredGallery() {
    if (this.selectedCategory === 'all') {
      return this.gallery;
    }

    return this.gallery.filter(
      x => x.category === this.selectedCategory
    );
  }

}
