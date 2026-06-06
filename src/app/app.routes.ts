import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./pages/about-us/about-us.component')
        .then((m) => m.AboutUsComponent)
  },
  {
    path: 'brain-tumor-surgery',
    loadComponent: () =>
      import('./pages/services/brain-tumor-surgery/brain-tumor-surgery.component')
        .then((m) => m.BrainTumorSurgeryComponent)
  },
  {
    path: 'minimally-invasive-spine-surgery',
    loadComponent: () =>
      import('./pages/services/minimally-invasive-spine-surgery/minimally-invasive-spine-surgery.component')
        .then((m) => m.MinimallyInvasiveSpineSurgeryComponent)
  },
  {
    path: 'endoscopic-spine-surgery',
    loadComponent: () =>
      import('./pages/services/endoscopic-spine-surgery/endoscopic-spine-surgery.component')
        .then((m) => m.EndoscopicSpineSurgeryComponent)
  },
  {
    path: 'stroke-management',
    loadComponent: () =>
      import('./pages/services/stroke-management/stroke-management.component')
        .then((m) => m.StrokeManagementComponent)
  },
  {
    path: 'trauma-emergency-neurosurgery',
    loadComponent: () =>
      import('./pages/services/trauma-emergency-neurosurgery/trauma-emergency-neurosurgery.component')
        .then((m) => m.TraumaEmergencyNeurosurgeryComponent)
  },
  {
    path: 'spine-fixation-decompression',
    loadComponent: () =>
      import('./pages/services/spine-fixation-decompression/spine-fixation-decompression.component')
        .then((m) => m.SpineFixationDecompressionComponent)
  },
  {
    path: 'chronic-back-pain-treatment',
    loadComponent: () =>
      import('./pages/services/chronic-back-pain-treatment/chronic-back-pain-treatment.component')
        .then((m) => m.ChronicBackPainTreatmentComponent)
  },
  {
    path: 'peripheral-nerve-surgery',
    loadComponent: () =>
      import('./pages/services/peripheral-nerve-surgery/peripheral-nerve-surgery.component')
        .then((m) => m.PeripheralNerveSurgeryComponent)
  },
  {
    path:'photos',
    loadComponent: () =>
      import('./pages/gallery/photos/photos.component')
        .then((m) => m.PhotosComponent)
  },
   {
    path:'videos',
    loadComponent: () =>
      import('./pages/gallery/videos/videos.component')
        .then((m) => m.VideosComponent)
  },
   {
    path:'awards',
    loadComponent: () =>
      import('./pages/gallery/awards/awards.component')
        .then((m) => m.AwardsComponent)
  },
   {
    path:'faq',
    loadComponent: () =>
      import('./pages/faq/faq.component')
        .then((m) => m.FaqComponent)
  },
   {
    path:'contact-us',
    loadComponent: () =>
      import('./pages/contactus/contactus.component')
        .then((m) => m.ContactusComponent)
  },
   {
    path:'blog',
    loadComponent: () =>
      import('./pages/blog/blog.component')
        .then((m) => m.BlogComponent)
  },
   {
    path:'blog/:slug',
    loadComponent: () =>
      import('./pages/blog-detail/blog-detail.component')
        .then((m) => m.BlogDetailComponent)
  },
  {
    path:'neurosurgeon/:slug',
    loadComponent: () =>
      import('./seo/neurosurgeon/neurosurgeon.component')
        .then((m) => m.NeurosurgeonComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
  