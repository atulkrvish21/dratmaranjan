export interface NavChildLink {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavChildLink[];
}

export interface blogPosts {

  id: number;

  slug: string;

  title: string;

  excerpt: string;

  image: string;

  content: string;

  category: string;

  author: string;

  date: string;

  readTime: string;

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
  linkedin: string;
  website: string;
  qualifications: string[];
  certifications: string[];
  experienceHighlights: string[];
  highlights: highlights[];
  expertise: string[];
  memberships: string[];
  academicContributions: string[];
  attributes: attributes[];
}

export interface highlights {
  text: string;
}
export interface attributes {
  title: string;
  desc: string;
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
  blogPosts: blogPosts[];
}
