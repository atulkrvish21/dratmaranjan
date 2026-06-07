import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject,OnInit,Input } from '@angular/core';
import { ClinicContentService } from '../../services/clinic-content.service';
import { AppointmentComponent } from '../../sections/appointment/appointment.component';
import { FooterComponent } from '../../sections/footer/footer.component';
import { NavbarComponent } from 'src/app/sections/navbar/navbar.component';
import {  AppointmentModelService } from '../../services/appointment-model.service';
import { ScrollRevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';

import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { SeoService } from 'src/app/services/seo.service';
import { HttpClient } from '@angular/common/http';



import { CardItem } from 'src/app/models/clinic-content.model';
import { MedicalIconComponent } from 'src/app/shared/medical-icon/medical-icon.component';
import { SectionHeadingComponent } from 'src/app/shared/section-heading/section-heading.component';
import { map } from 'rxjs';



const typeMap: any = {
  best: 'Best',
  top: 'Top',
  company: 'Leading',
  services: '',
  nearby: 'Nearby'
};

type ServiceKey =
  | 'neuro-surgeon'
  | 'brain-surgeon'
  | 'spine-surgeon'
  | 'neuro-and-spine-surgeon'
  | 'endoscopic-spine-surgeon'
  | 'brain-stroke-treatment'
  | 'kyphoplasty-doctor'
  | 'sciatica-treatment'
  | 'microvascular-decompression';

interface SeoContent {
  title: string;
  desc: string;
  content: string[];
}


@Component({
  selector: 'app-location-page',
  imports: [ AsyncPipe,
    NavbarComponent,
    FooterComponent,
    AppointmentComponent,
    ScrollRevealDirective,
SectionHeadingComponent, MedicalIconComponent,
    RouterLink,
    TitleCasePipe],
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class LocationPageComponent implements OnInit {
  city: string = '';
  hostname: string = window.location.hostname;
private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();
  readonly services = this.clinicContent.getContent().pipe(
    map(content => content.services || [])
  );

   
    private readonly modalService = inject(AppointmentModelService);
  // 1. Get the slug synchronously from the current route snapshot
  
  triggerGlobalPopup(event: Event): void {
    
    event.preventDefault();
    event.stopPropagation();
    this.modalService.open();
  }


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title, private meta: Meta, private seo: SeoService,
    private http: HttpClient
  ) { }
  formattedService: string = '';
  typeService: string = '';
  tags: any[] = [];
  pageData: SeoContent | null = null;
  slug = '';
   validServices: ServiceKey[] = [
    'neuro-surgeon',
    'brain-surgeon',
    'spine-surgeon',
    'neuro-and-spine-surgeon',
    'endoscopic-spine-surgeon',
    'brain-stroke-treatment',
    'kyphoplasty-doctor',
    'sciatica-treatment',
    'microvascular-decompression'
  ];

  seoContentMap: Record<ServiceKey, SeoContent> = {
    'neuro-surgeon': {
      title: 'Neurosurgeon in {city}',
      desc: 'Best neurosurgeon in {city}',
      content: [
        `<section class="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
  <div class="max-w-7xl x-auto mx-auto">
    
    <!-- Header Section -->
    <div class="text-center max-w-3xl mx-auto mb-16">
      <span class="text-blue-600 text-sm font-semibold tracking-wider uppercase">Advanced Neurosurgery</span>
      <h2 class="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
        World-Class Neurological Care in <span class="text-blue-600">{city}</span>
      </h2>
      <p class="mt-4 text-lg text-slate-600 leading-relaxed">
        Combining surgical excellence, cutting-edge medical technology, and dedicated compassionate care to restore your quality of life.
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- Card 1: Minimally Invasive -->
      <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col justify-between">
        <div>
          <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
            <!-- Icon: Microscope/Precision -->
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">Precision Techniques</h3>
          <p class="text-slate-600 leading-relaxed text-sm">
            We specialize in minimally invasive neurosurgery. Our advanced procedures target complex conditions with extreme precision, resulting in shorter recovery times and superior patient outcomes.
          </p>
        </div>
      </div>

      <!-- Card 2: Expert Team -->
      <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col justify-between">
        <div>
          <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
            <!-- Icon: User Group/Team -->
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.97 5.97 0 00-.75-2.906m-.173-4.059a4.5 4.5 0 110-8.718m0 8.718a4.5 4.5 0 01-4.5 4.5M12 11.25a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0 0c-1.67 0-3.18.53-4.432 1.433m1.344-8.914a6.005 6.005 0 0112.617 0m-12.617 0A6.005 6.005 0 001.5 9a6 6 0 001.528 3.897m11.253.53a4.5 4.5 0 01-4.5 4.5H12" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">Specialised Expertise</h3>
          <p class="text-slate-600 leading-relaxed text-sm">
            Our board-certified neurosurgeons in {city} deliver evidence-based, personalized treatments. We offer comprehensive care for complex brain tumors, spinal disorders, and traumatic brain injuries.
          </p>
        </div>
      </div>

      <!-- Card 3: Continuum of Care -->
      <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col justify-between">
        <div>
          <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
            <!-- Icon: Heart/Care -->
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">Complete Recovery</h3>
          <p class="text-slate-600 leading-relaxed text-sm">
            We support you through every stage of healing. Our clinic provides a full continuum of medical care, from advanced diagnostics and surgical intervention to targeted post-operative rehabilitation.
          </p>
        </div>
      </div>

    </div>

  </div>
</section>
`
      ]
    },

    'brain-surgeon': {
      title: 'Brain Surgeon in {city}',
      desc: 'Best brain surgeon in {city}',
      content: [
        `<section class="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
  <div class="max-w-6xl mx-auto">
    
    <!-- MAIN SEO H1 HEADER -->
    <header class="text-center max-w-3xl mx-auto mb-16">
      <span class="text-blue-600 text-sm font-semibold tracking-wider uppercase block mb-2">Neurological Centre of Excellence</span>
      <h1 class="text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-5xl tracking-tight leading-tight">
        Advanced <span class="text-blue-600">Brain Surgery Services</span> in {city}
      </h1>
      <p class="mt-4 text-lg text-slate-600 leading-relaxed">
        Providing world-class, expert care for complex neurological conditions using next-generation surgical techniques.
      </p>
    </header>

    <!-- TWO-COLUMN LAYOUT FOR CONTENT & CORE DISORDERS -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
      
      <!-- Left Column: Primary Content (SEO Rich) -->
      <div class="lg:col-span-7 space-y-6">
        <h2 class="text-2xl font-bold text-slate-950 tracking-tight">
          Expert Care & Minimally Invasive Neurosurgery
        </h2>
        <p class="text-slate-600 leading-relaxed">
          Our premier <strong class="text-slate-950 font-medium">neurosurgical clinic in {city}</strong> specializes in cutting-edge surgical interventions. By utilizing <strong class="text-slate-950 font-medium">minimally invasive brain surgery</strong>, our highly skilled neurosurgeons target complex conditions with extreme precision. This advanced approach results in reduced recovery times, minimal scarring, and significantly improved long-term patient outcomes.
        </p>
        <p class="text-slate-600 leading-relaxed">
          Our board-certified <strong class="text-slate-950 font-medium">brain surgeons in {city}</strong> deliver evidence-based, personalized treatments tailored to each patient's unique diagnostic profile.
        </p>
        
        <!-- Quick Stats Banner -->
        <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div>
            <p class="text-2xl font-bold text-blue-600">State-of-Art</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Neuro-Imaging</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-blue-600">Board</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Certified Surgeons</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-blue-600">Optimal</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Recovery Focus</p>
          </div>
        </div>
      </div>

      <!-- Right Column: SEO Targeted Conditions Grid -->
      <div class="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="text-lg font-bold text-slate-950 mb-4 tracking-tight">
          Neurological Disorders We Treat
        </h3>
        
        <ul class="space-y-4">
          <!-- Condition 1 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Brain Tumors</h4>
              <p class="text-xs text-slate-600 mt-0.5">Precision removal of benign and malignant growths via computer-assisted navigation.</p>
            </div>
          </li>
          <!-- Condition 2 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Epilepsy Surgery</h4>
              <p class="text-xs text-slate-600 mt-0.5">Targeted mapping and safe surgical intervention for drug-resistant epilepsy cases.</p>
            </div>
          </li>
          <!-- Condition 3 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Vascular Disorders</h4>
              <p class="text-xs text-slate-600 mt-0.5">Advanced microsurgery for brain aneurysms, arteriovenous malformations (AVMs), and stroke prevention.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- RECOVERY PROCESS SECTION (HORIZONTAL PATIENT JOURNEY) -->
    <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h2 class="text-2xl font-bold text-slate-950 mb-2 tracking-tight text-center sm:text-left">
        Your Complete Path to Neurological Recovery
      </h2>
      <p class="text-slate-600 text-sm mb-8 text-center sm:text-left max-w-2xl">
        From your initial consultation at our clinic in {city} to complete post-operative care, we support you at every phase.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Step 1 -->
        <div class="relative">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 1</span>
            <h3 class="text-base font-bold text-slate-950">Advanced Diagnostics</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Utilizing high-resolution medical neuroimaging to construct a precise architectural map of the neurological condition.
          </p>
        </div>

        <!-- Step 2 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 2</span>
            <h3 class="text-base font-bold text-slate-950">Surgical Intervention</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Operating in advanced surgical suites integrated with intraoperative mapping and neuro-navigation systems.
          </p>
        </div>

        <!-- Step 3 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 3</span>
            <h3 class="text-base font-bold text-slate-950">Post-Operative Rehab</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Customized neural rehabilitation and therapies designed to restore optimal cognitive function and improve your quality of life.
          </p>
        </div>
      </div>
    </div>

   

  </div>
</section>
`
      ]
    },

    'spine-surgeon': {
      title: 'Spine Surgeon in {city}',
      desc: 'Best spine surgeon in {city}',
      content: [
        `<section class="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
  <div class="max-w-6xl mx-auto">
    
    <!-- MAIN SEO H1 HEADER -->
    <header class="text-center max-w-3xl mx-auto mb-16">
      <span class="text-emerald-600 text-sm font-semibold tracking-wider uppercase block mb-2">Spinal Orthopaedic & Neurosurgical Excellence</span>
      <h1 class="text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-5xl tracking-tight leading-tight">
        Advanced <span class="text-emerald-600">Spine Surgery Services</span> in {city}
      </h1>
      <p class="mt-4 text-lg text-slate-600 leading-relaxed">
        Providing world-class, expert medical care for complex spinal conditions using modern, patient-first surgical techniques.
      </p>
    </header>

    <!-- TWO-COLUMN LAYOUT FOR CONTENT & CORE DISORDERS -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
      
      <!-- Left Column: Primary Content (SEO Rich) -->
      <div class="lg:col-span-7 space-y-6">
        <h2 class="text-2xl font-bold text-slate-950 tracking-tight">
          Expert Spine Care & Minimally Invasive Procedures
        </h2>
        <p class="text-slate-600 leading-relaxed">
          Our premier <strong class="text-slate-950 font-medium">spine clinic in {city}</strong> focuses on delivering cutting-edge treatments for debilitating back and neck issues. By specializing in <strong class="text-slate-950 font-medium">minimally invasive spine surgery</strong>, our highly skilled surgeons correct structural issues with extreme precision. This advanced approach means less muscle disruption, reduced hospital stays, and a faster return to daily activities.
        </p>
        <p class="text-slate-600 leading-relaxed">
          Our team of board-certified <strong class="text-slate-950 font-medium">spine surgeons in {city}</strong> delivers evidence-based, personalized treatment paths designed around your unique mobility goals.
        </p>
        
        <!-- Quick Stats Banner -->
        <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div>
            <p class="text-2xl font-bold text-emerald-600">Precision</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Endoscopic Tech</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-emerald-600">Expert</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Spine Specialists</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-emerald-600">Targeted</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Pain Recovery</p>
          </div>
        </div>
      </div>

      <!-- Right Column: SEO Targeted Conditions Grid -->
      <div class="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="text-lg font-bold text-slate-950 mb-4 tracking-tight">
          Spinal Disorders We Treat
        </h3>
        
        <ul class="space-y-4">
          <!-- Condition 1 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Herniated Discs</h4>
              <p class="text-xs text-slate-600 mt-0.5">Advanced microdiscectomy procedures to relieve nerve compression and radiating leg or arm pain.</p>
            </div>
          </li>
          <!-- Condition 2 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Spinal Stenosis</h4>
              <p class="text-xs text-slate-600 mt-0.5">Decompressive laminectomy options to widen the spinal canal and restore walking comfort.</p>
            </div>
          </li>
          <!-- Condition 3 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Scoliosis & Deformity</h4>
              <p class="text-xs text-slate-600 mt-0.5">Custom corrective alignment strategies and surgical stabilization for complex curvature issues.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- RECOVERY PROCESS SECTION (HORIZONTAL PATIENT JOURNEY) -->
    <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h2 class="text-2xl font-bold text-slate-950 mb-2 tracking-tight text-center sm:text-left">
        Your Complete Path to Spinal Health & Mobility
      </h2>
      <p class="text-slate-600 text-sm mb-8 text-center sm:text-left max-w-2xl">
        From early diagnostic medical imaging at our clinic in {city} to complete post-operative care, we guide you at every step.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Step 1 -->
        <div class="relative">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 1</span>
            <h3 class="text-base font-bold text-slate-950">Advanced Diagnostics</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Utilizing high-definition MRI, CT scans, and digital X-rays to pinpoint the exact structural source of your discomfort.
          </p>
        </div>

        <!-- Step 2 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 2</span>
            <h3 class="text-base font-bold text-slate-950">Surgical Intervention</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Operating in modern surgical rooms equipped with real-time intraoperative imaging, intraoperative monitoring, and navigation systems.
          </p>
        </div>

        <!-- Step 3 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 3</span>
            <h3 class="text-base font-bold text-slate-950">Post-Operative Rehab</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Individualized physical therapy, movement coaching, and long-term recovery plans designed to restore your overall quality of life.
          </p>
        </div>
      </div>
    </div>

    

  </div>
</section>
`
      ]
    },

    'neuro-and-spine-surgeon': {
      title: 'Neuro and Spine Surgeon in {city}',
      desc: 'Expert neuro and spine surgery in {city}',
      content: [
        `<section class="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
  <div class="max-w-6xl mx-auto">
    
    <!-- MAIN SEO H1 HEADER -->
    <header class="text-center max-w-3xl mx-auto mb-16">
      <span class="text-indigo-600 text-sm font-semibold tracking-wider uppercase block mb-2">Integrated Neurological & Spine Clinic</span>
      <h1 class="text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-5xl tracking-tight leading-tight">
        Comprehensive <span class="text-indigo-600">Neuro & Spine Surgery</span> in {city}
      </h1>
      <p class="mt-4 text-lg text-slate-600 leading-relaxed">
        World-class surgical care for complex brain and spinal conditions, delivering personalized treatment plans with advanced medical technology.
      </p>
    </header>

    <!-- TWO-COLUMN LAYOUT FOR CONTENT & CORE DISORDERS -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
      
      <!-- Left Column: Primary Content (SEO Rich) -->
      <div class="lg:col-span-7 space-y-6">
        <h2 class="text-2xl font-bold text-slate-950 tracking-tight">
          Expert Surgical Care Using Minimally Invasive Techniques
        </h2>
        <p class="text-slate-600 leading-relaxed">
          Our team of highly skilled <strong class="text-slate-950 font-medium">neuro and spine surgeons in {city}</strong> provides exceptional medical care for complex neurological and spinal disorders. By utilizing evidence-based practices and <strong class="text-slate-950 font-medium">minimally invasive surgical techniques</strong>, we target problematic areas with extreme precision. This reduces damage to surrounding tissues, resulting in shorter recovery periods and better long-term clinical outcomes for our patients.
        </p>
        <p class="text-slate-600 leading-relaxed">
          At our advanced <strong class="text-slate-950 font-medium">neurology and spine clinic in {city}</strong>, we are committed to compassionate, patient-centered care. Every treatment plan is tailored to the individual patient to ensure a safe path back to optimal health.
        </p>
        
        <!-- Quick Stats Banner -->
        <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div>
            <p class="text-2xl font-bold text-indigo-600">Dual</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Speciality Care</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-indigo-600">Advanced</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Micro-Surgical Suites</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-indigo-600">Complete</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Recovery Support</p>
          </div>
        </div>
      </div>

      <!-- Right Column: SEO Targeted Conditions Grid -->
      <div class="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="text-lg font-bold text-slate-950 mb-4 tracking-tight">
          Neurological & Spinal Disorders We Treat
        </h3>
        
        <ul class="space-y-4">
          <!-- Brain Conditions -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Brain Tumors & Epilepsy</h4>
              <p class="text-xs text-slate-600 mt-0.5">Precision surgical mapping and removal of lesions using advanced intraoperative tracking systems.</p>
            </div>
          </li>
          <!-- Spine Conditions -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Herniated Discs & Spinal Stenosis</h4>
              <p class="text-xs text-slate-600 mt-0.5">Targeted nerve decompression and microscopic spine surgeries to completely restore comfortable movement.</p>
            </div>
          </li>
          <!-- Complex Conditions -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Serious Chronic Conditions</h4>
              <p class="text-xs text-slate-600 mt-0.5">Comprehensive operative treatments for complex vascular, structural, and degenerative disorders.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- RECOVERY PROCESS SECTION (HORIZONTAL PATIENT JOURNEY) -->
    <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h2 class="text-2xl font-bold text-slate-950 mb-2 tracking-tight text-center sm:text-left">
        Your Complete Path to Neurological & Spinal Health
      </h2>
      <p class="text-slate-600 text-sm mb-8 text-center sm:text-left max-w-2xl">
        From early high-resolution diagnostics to customized post-operative therapy, we support you through every stage of your healing journey.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Step 1 -->
        <div class="relative">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 1</span>
            <h3 class="text-base font-bold text-slate-950">Detailed Diagnostics</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Utilizing state-of-the-art medical neuroimaging to construct a flawless architectural map of your condition before planning surgery.
          </p>
        </div>

        <!-- Step 2 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 2</span>
            <h3 class="text-base font-bold text-slate-950">Surgical Intervention</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Performing precision procedures in advanced operating suites fully integrated with specialized neuro-navigation technology.
          </p>
        </div>

        <!-- Step 3 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 3</span>
            <h3 class="text-base font-bold text-slate-950">Post-Operative Rehab</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Individualized neural and physical rehabilitation designed to restore mobility, recover cognitive function, and improve your daily quality of life.
          </p>
        </div>
      </div>
    </div>


  </div>
</section>
`
      ]
    },

    'endoscopic-spine-surgeon': {
      title: 'Endoscopic Spine Surgeon in {city}',
      desc: 'Expert endoscopic spine surgery in {city}',
      content: [
        `<section class="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
  <div class="max-w-6xl mx-auto">
    
    <!-- MAIN SEO H1 HEADER -->
    <header class="text-center max-w-3xl mx-auto mb-16">
      <span class="text-teal-600 text-sm font-semibold tracking-wider uppercase block mb-2">Ultra-Minimally Invasive Spine Care</span>
      <h1 class="text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-5xl tracking-tight leading-tight">
        Advanced <span class="text-teal-600">Endoscopic Spine Surgery</span> in {city}
      </h1>
      <p class="mt-4 text-lg text-slate-600 leading-relaxed">
        Experience rapid relief and faster recovery through ultra-precise, camera-guided spinal procedures performed by top-tier specialists.
      </p>
    </header>

    <!-- TWO-COLUMN LAYOUT FOR CONTENT & CORE DISORDERS -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
      
      <!-- Left Column: Primary Content (SEO Rich) -->
      <div class="lg:col-span-7 space-y-6">
        <h2 class="text-2xl font-bold text-slate-950 tracking-tight">
          Precise Camera-Guided Techniques with Accelerated Healing
        </h2>
        <p class="text-slate-600 leading-relaxed">
          Our premier team of <strong class="text-slate-950 font-medium">endoscopic spine surgeons in {city}</strong> provides modern, ultra-minimally invasive treatment options for complex back and neck issues. By utilizing a tiny HD camera inserted through an incision smaller than a fingernail, we execute precise tissue repairs without disrupting vital spinal muscles. This cutting-edge method drastically lowers post-operative discomfort, minimizes blood loss, and ensures significantly reduced recovery times.
        </p>
        <p class="text-slate-600 leading-relaxed">
          At our dedicated <strong class="text-slate-950 font-medium">endoscopic spine clinic in {city}</strong>, we pair state-of-the-art medical technology with patient-centered values. We focus on providing personalized paths to restore full flexibility and eliminate chronic pain safely.
        </p>
        
        <!-- Quick Stats Banner -->
        <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div>
            <p class="text-2xl font-bold text-teal-600">&lt; 10mm</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Micro Incisions</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-teal-600">HD</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Visualization</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-teal-600">Same-Day</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Outpatient Focus</p>
          </div>
        </div>
      </div>

      <!-- Right Column: SEO Targeted Conditions Grid -->
      <div class="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="text-lg font-bold text-slate-950 mb-4 tracking-tight">
          Spinal Conditions Treated Endoscopically
        </h3>
        
        <ul class="space-y-4">
          <!-- Condition 1 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Herniated Discs</h4>
              <p class="text-xs text-slate-600 mt-0.5">Endoscopic discectomy to remove herniated material under high-definition visualization, relieving severe nerve root pressure.</p>
            </div>
          </li>
          <!-- Condition 2 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Spinal Stenosis</h4>
              <p class="text-xs text-slate-600 mt-0.5">Targeted bone and ligament shaving through an endoscope to widen narrowed spinal paths and treat leg numbness.</p>
            </div>
          </li>
          <!-- Condition 3 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Complex Spinal Disorders</h4>
              <p class="text-xs text-slate-600 mt-0.5">Tailored microneurosurgical options for localized bone spur decompressions and chronic facet joint pain.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- RECOVERY PROCESS SECTION (HORIZONTAL PATIENT JOURNEY) -->
    <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h2 class="text-2xl font-bold text-slate-950 mb-2 tracking-tight text-center sm:text-left">
        Your Endoscopic Journey to Lasting Mobility
      </h2>
      <p class="text-slate-600 text-sm mb-8 text-center sm:text-left max-w-2xl">
        From advanced localized diagnostics at our {city} medical office to direct rehabilitation, we guide your healing step-by-step.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Step 1 -->
        <div class="relative">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 1</span>
            <h3 class="text-base font-bold text-slate-950">Detailed Diagnostics</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Utilizing specialized high-field MRI and motion-mapping scans to build an exact anatomical blueprint of the affected nerve area.
          </p>
        </div>

        <!-- Step 2 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 2</span>
            <h3 class="text-base font-bold text-slate-950">Endoscopic Intervention</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Executing target repairs inside specialized outpatient surgical rooms outfitted with real-time microscopic video systems.
          </p>
        </div>

        <!-- Step 3 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 3</span>
            <h3 class="text-base font-bold text-slate-950">Targeted Rehabilitation</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Participating in specific, gentle core muscle conditioning and functional alignment programs to guarantee long-term joint health.
          </p>
        </div>
      </div>
    </div>

    

  </div>
</section>
`
      ]
    },

    

    'brain-stroke-treatment': {
      title: 'Brain Stroke Treatment in {city}',
      desc: 'Expert brain stroke treatment in {city}',
      content: [
        `<section class="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
  <div class="max-w-6xl mx-auto">
    
    <!-- MAIN SEO H1 HEADER -->
    <header class="text-center max-w-3xl mx-auto mb-16">
      <span class="text-rose-600 text-sm font-semibold tracking-wider uppercase block mb-2">Comprehensive Stroke Center of Excellence</span>
      <h1 class="text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-5xl tracking-tight leading-tight">
        Advanced <span class="text-rose-600">Brain Stroke Treatment</span> in {city}
      </h1>
      <p class="mt-4 text-lg text-slate-600 leading-relaxed">
        Providing life-saving, rapid-response neurological interventions and comprehensive rehabilitation for acute stroke patients.
      </p>
    </header>

    <!-- TWO-COLUMN LAYOUT FOR CONTENT & CORE DISORDERS -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
      
      <!-- Left Column: Primary Content (SEO Rich) -->
      <div class="lg:col-span-7 space-y-6">
        <h2 class="text-2xl font-bold text-slate-950 tracking-tight">
          Rapid-Response Neurology & Specialized Stroke Intervention
        </h2>
        <p class="text-slate-600 leading-relaxed">
          Our elite team of <strong class="text-slate-950 font-medium">neurologists and stroke specialists in {city}</strong> delivers comprehensive, time-critical medical care for cerebrovascular emergencies. By leveraging <strong class="text-slate-950 font-medium">advanced vascular diagnostic tools</strong> and evidence-based protocols, we ensure immediate, accurate assessment. Because every second matters during a neurological event, our rapid-deployment workflows focus on minimizing brain tissue injury and maximizing clinical outcomes.
        </p>
        <p class="text-slate-600 leading-relaxed">
          At our dedicated <strong class="text-slate-950 font-medium">stroke clinic in {city}</strong>, we pair compassionate care with absolute precision. We offer continuous specialized management to guide survivors safely back to functional independence.
        </p>
        
        <!-- Quick Stats Banner -->
        <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div>
            <p class="text-2xl font-bold text-rose-600">24/7</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Acute Response</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-rose-600">Ultra-Fast</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">CT & MRI Protocol</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-rose-600">Complete</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Neuro-Recovery</p>
          </div>
        </div>
      </div>

      <!-- Right Column: SEO Targeted Conditions Grid -->
      <div class="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="text-lg font-bold text-slate-950 mb-4 tracking-tight">
          Cerebrovascular Conditions We Treat
        </h3>
        
        <ul class="space-y-4">
          <!-- Condition 1 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Ischemic Strokes</h4>
              <p class="text-xs text-slate-600 mt-0.5">Timely delivery of clot-dissolving therapies (tPA) and advanced mechanical thrombectomy to restore critical blood flow.</p>
            </div>
          </li>
          <!-- Condition 2 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Hemorrhagic Strokes</h4>
              <p class="text-xs text-slate-600 mt-0.5">Immediate surgical decompression, aneurysm clipping, or endovascular coiling to stop intracerebral bleeding.</p>
            </div>
          </li>
          <!-- Condition 3 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Transient Ischemic Attacks (TIA)</h4>
              <p class="text-xs text-slate-600 mt-0.5">Comprehensive preventative tracking, carotid artery imaging, and therapy to ward off full-scale strokes.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- RECOVERY PROCESS SECTION (HORIZONTAL PATIENT JOURNEY) -->
    <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h2 class="text-2xl font-bold text-slate-950 mb-2 tracking-tight text-center sm:text-left">
        The Stroke Care Continuum: Crisis to Control
      </h2>
      <p class="text-slate-600 text-sm mb-8 text-center sm:text-left max-w-2xl">
        From advanced emergency stroke mapping at our {city} facilities to comprehensive neural rehabilitation, we protect your health.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Step 1 -->
        <div class="relative">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 1</span>
            <h3 class="text-base font-bold text-slate-950">Detailed Diagnostics</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Utilizing high-resolution CT angiograms and perfusion MRI tracking to instantly clarify stroke type and locate vascular blockages.
          </p>
        </div>

        <!-- Step 2 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 2</span>
            <h3 class="text-base font-bold text-slate-950">Acute Management</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Administering targeted pharmaceutical or endovascular therapies inside specialized neurological intensive care suites.
          </p>
        </div>

        <!-- Step 3 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 3</span>
            <h3 class="text-base font-bold text-slate-950">Post-Stroke Rehab</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Deploying integrated physical, occupational, and speech neuro-therapies designed to rebuild pathways and restore your lifestyle.
          </p>
        </div>
      </div>
    </div>

   

  </div>
</section>
`
      ]
    },

    'kyphoplasty-doctor': {
      title: 'Kyphoplasty Doctor in {city}',
      desc: 'Expert kyphoplasty doctor in {city}',
      content: [
        `<section class="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
  <div class="max-w-6xl mx-auto">
    
    <!-- MAIN SEO H1 HEADER -->
    <header class="text-center max-w-3xl mx-auto mb-16">
      <span class="text-sky-600 text-sm font-semibold tracking-wider uppercase block mb-2">Advanced Interventional Spine & Fracture Care</span>
      <h1 class="text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-5xl tracking-tight leading-tight">
        Specialised <span class="text-sky-600">Kyphoplasty Treatment</span> in {city}
      </h1>
      <p class="mt-4 text-lg text-slate-600 leading-relaxed">
        Restore vertebral height, eliminate severe back pain, and regain your structural mobility with ultra-precise bone cement augmentation.
      </p>
    </header>

    <!-- TWO-COLUMN LAYOUT FOR CONTENT & CORE DISORDERS -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
      
      <!-- Left Column: Primary Content (SEO Rich) -->
      <div class="lg:col-span-7 space-y-6">
        <h2 class="text-2xl font-bold text-slate-950 tracking-tight">
          Minimally Invasive Relief for Vertebral Compression Fractures
        </h2>
        <p class="text-slate-600 leading-relaxed">
          Our premier medical team of <strong class="text-slate-950 font-medium">kyphoplasty doctors in {city}</strong> provides specialized interventional care for painful spinal fractures. By utilizing a cutting-edge, image-guided balloon system, we gently lift collapsed vertebrae back toward their native structural alignment. Once the correct space is created, medical-grade bone cement is carefully deployed to secure the bone, providing immediate structural stabilization and rapid, long-lasting pain relief.
        </p>
        <p class="text-slate-600 leading-relaxed">
          At our state-of-the-art <strong class="text-slate-950 font-medium">kyphoplasty clinic in {city}</strong>, we are committed to patient-centered safety. Our targeted approach eliminates the need for open spine surgery, minimizing muscle disruption and allowing patients to walk comfortably soon after treatment.
        </p>
        
        <!-- Quick Stats Banner -->
        <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div>
            <p class="text-2xl font-bold text-sky-600">Rapid</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Pain Alleviation</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-sky-600">Outpatient</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Same-Day Procedure</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-sky-600">Height</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Restoration Focus</p>
          </div>
        </div>
      </div>

      <!-- Right Column: SEO Targeted Indications Grid -->
      <div class="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="text-lg font-bold text-slate-950 mb-4 tracking-tight">
          Indications for Kyphoplasty Treatment
        </h3>
        
        <ul class="space-y-4">
          <!-- Indication 1 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Vertebral Compression Fractures</h4>
              <p class="text-xs text-slate-600 mt-0.5">Targeted treatment for bone collapse in the thoracic or lumbar spine caused by minor trauma or daily stress.</p>
            </div>
          </li>
          <!-- Indication 2 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Osteoporosis Fractures</h4>
              <p class="text-xs text-slate-600 mt-0.5">Stabilization of porous, weakened spinal bones to stop progressive spinal curvature and forward-stooping posture.</p>
            </div>
          </li>
          <!-- Indication 3 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Cancer-Related Bone Weakness</h4>
              <p class="text-xs text-slate-600 mt-0.5">Supportive structural fortification for vertebral bodies affected by localized tumors, lesions, or multiple myeloma.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- RECOVERY PROCESS SECTION (HORIZONTAL PATIENT JOURNEY) -->
    <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h2 class="text-2xl font-bold text-slate-950 mb-2 tracking-tight text-center sm:text-left">
        The Path to Spine Stabilization & Comfort
      </h2>
      <p class="text-slate-600 text-sm mb-8 text-center sm:text-left max-w-2xl">
        From comprehensive bone density mapping to safe post-operative care, we focus entirely on your mobility.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Step 1 -->
        <div class="relative">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 1</span>
            <h3 class="text-base font-bold text-slate-950">Detailed Diagnostics</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Utilizing high-resolution spinal MRI or CT scans to definitively confirm fracture age, swelling levels, and bone density baseline.
          </p>
        </div>

        <!-- Step 2 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 2</span>
            <h3 class="text-base font-bold text-slate-950">Kyphoplasty Intervention</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Performing precise balloon expansion and cement delivery under real-time fluoroscopic X-ray tracking for safety.
          </p>
        </div>

        <!-- Step 3 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 3</span>
            <h3 class="text-base font-bold text-slate-950">Post-Operative Rehabilitation</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Providing tailored posture training, gentle mobility exercises, and metabolic bone guidance to shield your spine from future damage.
          </p>
        </div>
      </div>
    </div>

   

  </div>
</section>
`
      ]
    },

    'sciatica-treatment': {
      title: 'Sciatica Treatment in {city}',
      desc: 'Expert sciatica treatment in {city}',
      content: [
       `<section class="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
  <div class="max-w-6xl mx-auto">
    
    <!-- MAIN SEO H1 HEADER -->
    <header class="text-center max-w-3xl mx-auto mb-16">
      <span class="text-violet-600 text-sm font-semibold tracking-wider uppercase block mb-2">Interventional Pain Management Center</span>
      <h1 class="text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-5xl tracking-tight leading-tight">
        Advanced <span class="text-violet-600">Sciatica Treatment</span> in {city}
      </h1>
      <p class="mt-4 text-lg text-slate-600 leading-relaxed">
        Relieve radiating leg pain, restore nerve mobility, and reclaim your active lifestyle with customized, evidence-based therapies.
      </p>
    </header>

    <!-- TWO-COLUMN LAYOUT FOR CONTENT & CORE DISORDERS -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
      
      <!-- Left Column: Primary Content (SEO Rich) -->
      <div class="lg:col-span-7 space-y-6">
        <h2 class="text-2xl font-bold text-slate-950 tracking-tight">
          Targeted Relief for Sciatic Nerve Pain and Discomfort
        </h2>
        <p class="text-slate-600 leading-relaxed">
          Our premier medical team of <strong class="text-slate-950 font-medium">pain management specialists in {city}</strong> provides exceptional, comprehensive care for debilitating nerve pathways. By combining advanced diagnostic imaging with <strong class="text-slate-950 font-medium">minimally invasive sciatica treatments</strong>, we pinpoint the exact source of your spinal nerve compression. We offer fast-acting solutions to stop lower back pain from radiating down your hips, buttocks, and legs.
        </p>
        <p class="text-slate-600 leading-relaxed">
          At our state-of-the-art <strong class="text-slate-950 font-medium">sciatica clinic in {city}</strong>, our physical medicine approach emphasizes non-surgical healing. We design highly personalized medical plans that resolve core structural issues without the need for prolonged downtime.
        </p>
        
        <!-- Quick Stats Banner -->
        <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div>
            <p class="text-2xl font-bold text-violet-600">Targeted</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Nerve Block Therapy</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-violet-600">Non-Surgical</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Outpatient Focus</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-violet-600">Rapid</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Mobility Restored</p>
          </div>
        </div>
      </div>

      <!-- Right Column: SEO Targeted Conditions Grid -->
      <div class="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="text-lg font-bold text-slate-950 mb-4 tracking-tight">
          Sciatica Symptoms & Root Causes We Manage
        </h3>
        
        <ul class="space-y-4">
          <!-- Condition 1 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-violet-50 text-violet-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Lumbar Radiculopathy</h4>
              <p class="text-xs text-slate-600 mt-0.5">Relieving deep, electric, burning shocks or shooting pain triggered by sub-lumbar root inflammation.</p>
            </div>
          </li>
          <!-- Condition 2 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-violet-50 text-violet-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Disc-Induced Compression</h4>
              <p class="text-xs text-slate-600 mt-0.5">Managing underlying lumbar bulging or herniated discs that physically pinch the primary sciatic pathway.</p>
            </div>
          </li>
          <!-- Condition 3 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-violet-50 text-violet-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Numbness & Muscle Weakness</h4>
              <p class="text-xs text-slate-600 mt-0.5">Reversing functional chronic leg weakness, pins-and-needles tingling, and localized foot-drop issues.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- RECOVERY PROCESS SECTION (HORIZONTAL PATIENT JOURNEY) -->
    <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h2 class="text-2xl font-bold text-slate-950 mb-2 tracking-tight text-center sm:text-left">
        The Path to Long-Term Nerve Recovery
      </h2>
      <p class="text-slate-600 text-sm mb-8 text-center sm:text-left max-w-2xl">
        From precise pinpoint mapping to restorative movement medicine, we support your recovery at every phase.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Step 1 -->
        <div class="relative">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 1</span>
            <h3 class="text-base font-bold text-slate-950">Detailed Diagnostics</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Utilizing strategic physical alignment metrics and high-field lumbar MRI checks to isolate the compressed root segment.
          </p>
        </div>

        <!-- Step 2 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 2</span>
            <h3 class="text-base font-bold text-slate-950">Interventional Care</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Administering conservative medical plans, or executing targeted, image-guided epidural steroid injections to directly calm the nerve.
          </p>
        </div>

        <!-- Step 3 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 3</span>
            <h3 class="text-base font-bold text-slate-950">Restorative Rehabilitation</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Strengthening core stabilizers through targeted physical therapy and lumbar decompression movements to prevent future flare-ups.
          </p>
        </div>
      </div>
    </div>

   

  </div>
</section>
`
      ]
    },

    'microvascular-decompression': {
      title: 'Microvascular Decompression in {city}',
      desc: 'Expert microvascular decompression in {city}',
      content: [
       `<section class="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
  <div class="max-w-6xl mx-auto">
    
    <!-- MAIN SEO H1 HEADER -->
    <header class="text-center max-w-3xl mx-auto mb-16">
      <span class="text-cyan-600 text-sm font-semibold tracking-wider uppercase block mb-2">Advanced Cranial Neurosurgery Center</span>
      <h1 class="text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-5xl tracking-tight leading-tight">
        Specialised <span class="text-cyan-600">Trigeminal Neuralgia Treatment</span> in {city}
      </h1>
      <p class="mt-4 text-lg text-slate-600 leading-relaxed">
        Eliminate severe, debilitating facial pain and restore your daily comfort with precision microvascular decompression surgery.
      </p>
    </header>

    <!-- TWO-COLUMN LAYOUT FOR CONTENT & CORE DISORDERS -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
      
      <!-- Left Column: Primary Content (SEO Rich) -->
      <div class="lg:col-span-7 space-y-6">
        <h2 class="text-2xl font-bold text-slate-950 tracking-tight">
          Targeted Relief for Complex Facial Nerve Pain
        </h2>
        <p class="text-slate-600 leading-relaxed">
          Our premier medical team of <strong class="text-slate-950 font-medium">neurosurgeons in {city}</strong> provides highly specialized, expert care for patients suffering from trigeminal neuralgia. By utilizing advanced neurosurgical imaging and microneurosurgery techniques, we isolate the exact blood vessels causing painful compression on the fifth cranial nerve. Our precise interventions resolve the root anatomical cause of your symptoms to provide long-lasting, definitive relief.
        </p>
        <p class="text-slate-600 leading-relaxed">
          At our state-of-the-art <strong class="text-slate-950 font-medium">trigeminal neuralgia clinic in {city}</strong>, we specialize in <strong class="text-slate-950 font-medium">microvascular decompression (MVD)</strong>. This advanced procedure moves conflicting blood vessels away from the nerve root, sparing facial sensation and delivering the highest possible clinical success rates.
        </p>
        
        <!-- Quick Stats Banner -->
        <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div>
            <p class="text-2xl font-bold text-cyan-600">Precision</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Microscope Tech</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-cyan-600">Nerve</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Sparing Focus</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-cyan-600">Definitive</p>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Pain Alleviation</p>
          </div>
        </div>
      </div>

      <!-- Right Column: SEO Targeted Conditions & Symptoms Grid -->
      <div class="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="text-lg font-bold text-slate-950 mb-4 tracking-tight">
          Symptoms & Indications We Address
        </h3>
        
        <ul class="space-y-4">
          <!-- Indication 1 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-cyan-50 text-cyan-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Electric Shock Facial Pain</h4>
              <p class="text-xs text-slate-600 mt-0.5">Alleviating sudden, severe, stabbing pains triggered in the jaw, cheek, or around the eye by eating, speaking, or washing your face.</p>
            </div>
          </li>
          <!-- Indication 2 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-cyan-50 text-cyan-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Microvascular Decompression (MVD)</h4>
              <p class="text-xs text-slate-600 mt-0.5">Performing highly precise, minimally invasive microscopic surgery to cushion the trigeminal nerve from throbbing arterial pulse pressure.</p>
            </div>
          </li>
          <!-- Indication 3 -->
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-5 h-5 bg-cyan-50 text-cyan-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
            <div>
              <h4 class="text-sm font-semibold text-slate-950">Medication-Resistant Neuralgia</h4>
              <p class="text-xs text-slate-600 mt-0.5">Providing secondary surgical solutions when traditional anticonvulsant or nerve pain prescriptions lose effectiveness.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- RECOVERY PROCESS SECTION (HORIZONTAL PATIENT JOURNEY) -->
    <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h2 class="text-2xl font-bold text-slate-950 mb-2 tracking-tight text-center sm:text-left">
        Your Complete Path to a Pain-Free Life
      </h2>
      <p class="text-slate-600 text-sm mb-8 text-center sm:text-left max-w-2xl">
        From localized, high-resolution diagnostic mapping at our {city} clinic to post-operative neural monitoring, we guide you.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Step 1 -->
        <div class="relative">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 1</span>
            <h3 class="text-base font-bold text-slate-950">Detailed Diagnostics</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Utilizing high-definition 3D Fiesta MRI scans to definitively track precise vascular loops pinching the cranial nerve complex.
          </p>
        </div>

        <!-- Step 2 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 2</span>
            <h3 class="text-base font-bold text-slate-950">MVD Intervention</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Executing tiny, targeted sub-occipital access paths to place a protective surgical pad between the pulsing blood vessel and the nerve.
          </p>
        </div>

        <!-- Step 3 -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Phase 3</span>
            <h3 class="text-base font-bold text-slate-950">Post-Operative Rehab</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            Providing structured neural observation and personalized outpatient recovery protocols to help you securely reclaim your daily routines.
          </p>
        </div>
      </div>
    </div>

   

  </div>
</section>
`
      ]
        
    }
  };

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      // city
      const cityParam = params.get('city') ?? '';
      const citySlug = cityParam.toLowerCase();
      this.city = cityParam.charAt(0).toUpperCase() + cityParam.slice(1);

      // type (query param)
      const type = this.route.snapshot.queryParamMap.get('type') ?? '';
      this.typeService = type;
      this.slug = this.route.snapshot.url[0]?.path ?? '';
      // service
      const rawService = this.route.snapshot.url[0]?.path ?? '';

      if (!this.validServices.includes(rawService as ServiceKey)) {
        this.router.navigate(['/']);
        return;
      }
      this.route.queryParamMap.subscribe(query => {

        const type = query.get('type') ?? '';
        this.typeService = type;


        const service = rawService as ServiceKey;

        // formatted service
        this.formattedService = service
          .split('-')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        const template = this.seoContentMap[service];

        // type prefix
        const typeMap: any = {
          best: 'Best',
          top: 'Top',
          company: 'Leading',
          services: '',
          nearby: 'Nearby'
        };

        const prefix = typeMap[type] || '';

        // title
        let finalTitle = template.title.replace(/{city}/g, this.city);

        if (prefix) {
          finalTitle = `${prefix} ${finalTitle}`;
        }

        // page content
        this.pageData = {
          title: finalTitle,
          desc: template.desc.replace(/{city}/g, this.city),
          content: template.content.map(c =>
            c.replace(/{city}/g, this.city)
          )
        };

        // SEO update
        this.seo.updateSEO({
          title: finalTitle,
          description: `${prefix ? prefix + ' ' : ''}${template.desc.replace(/{city}/g, this.city)}`,
          keywords: `${this.formattedService} ${this.city}, ${prefix} ${this.formattedService} ${this.city}, IT company ${this.city}`,
          image: 'images/logo.png',
          url: `/${service}/${citySlug}${type ? '?type=' + type : ''}`
        });

        // tags
        this.tags = [
          {
            text: `${this.formattedService} in ${this.city}`,
            path: [service, citySlug],
            query: null
          },
          {
            text: `Best ${this.formattedService} ${this.city}`,
            path: [service, citySlug],
            query: { type: 'best' }
          },
          {
            text: `${this.formattedService} Company ${this.city}`,
            path: [service, citySlug],
            query: { type: 'company' }
          },
          {
            text: `${this.formattedService} Services ${this.city}`,
            path: [service, citySlug],
            query: { type: 'services' }
          },
          {
            text: `${this.formattedService} Near Me ${this.city}`,
            path: [service, citySlug],
            query: { type: 'nearby' }
          },
          {
            text: `Top IT Company ${this.city}`,
            path: ['software-development', citySlug],
            query: null
          },
          {
            text: `SEO Services ${this.city}`,
            path: ['seo', citySlug],
            query: null
          },
          {
            text: `Web Hosting ${this.city}`,
            path: ['web-hosting', citySlug],
            query: null
          },
          {
            text: `Mobile App Development ${this.city}`,
            path: ['mobile-app-development', citySlug],
            query: null
          },
          {
            text: `Social Media Marketing ${this.city}`,
            path: ['smm', citySlug],
            query: null
          }
        ];

      });
    });
  }
}
