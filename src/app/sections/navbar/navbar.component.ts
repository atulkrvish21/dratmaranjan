import { Component, HostListener, Input } from '@angular/core';
import { DoctorProfile, NavLink } from '../../models/clinic-content.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input({ required: true }) links: NavLink[] = [];
  @Input({ required: true }) doctor!: DoctorProfile;

  menuOpen = false;
  scrolled = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 12;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
