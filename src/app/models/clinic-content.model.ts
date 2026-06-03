export interface NavChildLink {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavChildLink[];
}

export interface DoctorProfile {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  image: string;
  logo: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  qualifications: string[];
  certifications: string[];
  experienceHighlights: string[];
}

export interface CardItem {
  icon: string;
  title: string;
  description: string;
  image?: string;
  points?: string[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface Testimonial {
  name: string;
  condition: string;
  rating: number;
  review: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ClinicContent {
  navLinks: NavLink[];
  doctor: DoctorProfile;
  services: CardItem[];
  conditions: CardItem[];
  stats: StatItem[];
  trust: CardItem[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
}
