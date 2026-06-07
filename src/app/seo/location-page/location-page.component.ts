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
  | 'mobile-app-development'
  | 'web-hosting'
  | 'seo'
  | 'social-media-marketing'
  | 'smm'
  | 'it-company';

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
    'mobile-app-development',
    'web-hosting',
    'seo',
    'social-media-marketing',
    'smm',
    'it-company'
  ];

  seoContentMap: Record<ServiceKey, SeoContent> = {
    'neuro-surgeon': {
      title: 'Neurosurgeon in {city}',
      desc: 'Best neurosurgeon in {city}',
      content: [
        `<p>Our neurosurgical services in {city} are designed to provide cutting-edge care for complex neurological conditions. We specialize in minimally invasive techniques and advanced surgical procedures to ensure the best possible outcomes for our patients.</p>
        <p>Our team of experienced neurosurgeons in {city} is dedicated to delivering personalized care and innovative treatments for a wide range of neurological disorders. We utilize state-of-the-art technology and evidence-based practices to provide comprehensive care for conditions such as brain tumors, spinal disorders, and traumatic brain injuries.</p>
        <p>At our clinic in {city}, we are committed to providing compassionate and expert neurosurgical care. Our services include advanced diagnostics, surgical interventions, and post-operative rehabilitation to help patients achieve optimal recovery and improved quality of life.</p>`
      ]
    },

    'brain-surgeon': {
      title: 'Brain Surgeon in {city}',
      desc: 'Best brain surgeon in {city}',
      content: [
        `<p>Our brain surgery services in {city} are focused on providing expert care for complex neurological conditions. We specialize in advanced surgical techniques and minimally invasive procedures to ensure the best outcomes for our patients.</p>`,

        `<p>Our team of skilled brain surgeons in {city} is dedicated to delivering personalized care and innovative treatments for a wide range of neurological disorders. We utilize state-of-the-art technology and evidence-based practices to provide comprehensive care for conditions such as brain tumors, epilepsy, and vascular disorders.</p>`,

        `<p>At our clinic in {city}, we are committed to providing compassionate and expert brain surgery care. Our services include advanced diagnostics, surgical interventions, and post-operative rehabilitation to help patients achieve optimal recovery and improved quality of life.</p>`
      ]
    },

    'mobile-app-development': {
      title: 'Mobile App Development in {city}',
      desc: 'Top mobile app development company in {city}',
      content: [
        'We are a leading mobile app development company in {city}, offering innovative and high-performance mobile applications for businesses of all sizes. Our focus is to create user-friendly, scalable and feature-rich mobile apps that deliver a seamless experience across all devices.',

        'Our expert developers specialize in Android app development and cross-platform solutions using modern frameworks like Flutter and advanced technologies. We build applications with attractive UI/UX design, smooth performance and strong backend integration to ensure reliability and efficiency.',

        'From startup ideas to enterprise-level applications, we provide complete mobile app development services in {city} including UI/UX design, API integration, database management and deployment. Our apps are optimized for speed, security and performance to meet modern business needs.',

        'We also focus on security and scalability by implementing best practices such as secure authentication, data protection and cloud integration. Our goal is to deliver mobile applications that not only meet your requirements but also help your business grow and engage users effectively.',

        'If you are looking for the best mobile app development services in {city}, Maniacs Infotech is your trusted partner. We build powerful, scalable and future-ready mobile applications that help you stay ahead in the competitive digital market.'
      ]
    },

    'web-hosting': {
      title: 'Web Hosting Services in {city}',
      desc: 'Reliable web hosting in {city}',
      content: [
        'We provide reliable and high-performance web hosting services in {city} designed to ensure your website runs smoothly with maximum uptime and speed. Our hosting solutions are suitable for businesses, startups and individuals who need secure and scalable hosting infrastructure.',

        'Our web hosting services in {city} include fast SSD servers, domain registration, SSL certificate integration and optimized server configurations. We ensure that your website loads quickly, performs efficiently and remains accessible to users at all times.',

        'We offer both Linux and Windows hosting solutions based on your business requirements. Whether you are running a static website, dynamic web application or enterprise-level platform, our hosting environment is designed to handle high traffic and ensure stability.',

        'Security is a top priority in our hosting services. We implement advanced security measures such as HTTPS, firewall protection, regular backups and server monitoring to keep your website safe from threats and data loss.',

        'If you are looking for fast and secure web hosting services in {city}, Maniacs Infotech provides cost-effective and reliable hosting solutions that ensure your website performs at its best and supports your business growth.'
      ]
    },

    'seo': {
      title: 'SEO Services in {city}',
      desc: 'Best SEO services in {city}',
      content: [
        'We provide professional SEO services in {city} to help businesses improve their online visibility and rank higher on search engines like Google. Our goal is to drive targeted organic traffic to your website and increase leads, conversions and overall business growth.',

        'Our SEO experts use advanced strategies including keyword research, on-page SEO, technical SEO and content optimization to improve your website performance. We analyze your competitors, target high-ranking keywords and optimize your website structure to achieve better search engine rankings.',

        'We offer complete SEO solutions in {city} including website audit, meta tag optimization, page speed improvement, mobile optimization and backlink building. Our approach is data-driven and focused on delivering long-term results instead of short-term gains.',

        'We also focus on local SEO services in {city} to help your business appear in local search results and Google Maps. This helps you attract nearby customers and grow your business in your target location.',

        'If you are looking for the best SEO services in {city}, Maniacs Infotech is your trusted partner. We provide result-oriented SEO strategies that boost your online presence and help your business stay ahead of the competition.'
      ]
    },

    'social-media-marketing': {
      title: 'Social Media Marketing in {city}',
      desc: 'Professional SMM services in {city}',
      content: [
        'We provide professional social media marketing services in {city} to help businesses build a strong online presence and connect with their target audience effectively. Our strategies focus on increasing brand awareness, engagement and lead generation across popular social media platforms.',

        'Our team manages social media campaigns on platforms like Facebook, Instagram and LinkedIn. We create high-quality content, design attractive creatives and run targeted ad campaigns to reach the right audience and maximize your return on investment.',

        'We offer complete SMM solutions in {city} including content planning, social media management, paid advertising, audience targeting and performance tracking. Our approach is data-driven and focused on delivering measurable results for your business growth.',

        'We also help businesses build their brand identity by maintaining consistent posting, engaging with followers and improving customer interaction. Our goal is to turn your social media presence into a powerful marketing channel.',

        'If you are looking for reliable social media marketing services in {city}, Maniacs Infotech provides result-oriented SMM strategies that help you grow your business, generate leads and increase your online visibility.'
      ]
    },

    'smm': {
      title: 'SMM Services in {city}',
      desc: 'Expert SMM services in {city}',
      content: [
        'We provide expert SMM services in {city} to help businesses grow their online presence and reach a wider audience through powerful social media strategies. Our goal is to increase brand visibility, engagement and lead generation using the most effective platforms.',

        'Our social media marketing services in {city} cover all major platforms including Instagram, Facebook, Twitter and TikTok. We create engaging content, eye-catching creatives and targeted campaigns that attract users and convert them into customers.',

        'We specialize in running paid advertising campaigns on Instagram Ads, Facebook Ads and other platforms to maximize your reach and return on investment. Our team focuses on precise audience targeting, performance tracking and continuous optimization for better results.',

        'Our SMM services also include content planning, post scheduling, audience engagement and brand building. We ensure your business maintains a consistent and professional presence across all social media channels.',

        'If you are looking for expert SMM services in {city}, Maniacs Infotech delivers result-driven strategies using Instagram, Facebook, Twitter and TikTok marketing to help your business grow faster and stay ahead of the competition.'
      ]
    },

    'it-company': {
      title: 'IT Company in {city}',
      desc: 'Top IT company in {city}',
      content: [
        'Maniacs Infotech is a leading IT company in {city}, providing complete technology solutions for businesses, startups and enterprises. We help organizations grow digitally by offering innovative, scalable and result-oriented IT services tailored to their specific needs.',

        'Our IT services in {city} include website development, software development, mobile app development, SEO services and social media marketing. We use modern technologies like Angular, .NET Core and cloud-based solutions to build fast, secure and high-performance digital platforms.',

        'We specialize in developing custom software solutions such as billing systems, ERP applications and business automation tools that improve efficiency and streamline operations. Our team focuses on delivering user-friendly, scalable and future-ready solutions.',

        'In addition, we provide digital marketing services including SEO and SMM to help businesses increase their online visibility, generate leads and grow their brand. Our data-driven strategies ensure long-term success and better return on investment.',

        'If you are looking for a reliable IT company in {city}, Maniacs Infotech is your trusted partner for complete digital transformation. We deliver high-quality solutions that help your business stay competitive and succeed in the digital world.'
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
