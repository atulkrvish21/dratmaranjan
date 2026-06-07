import { Component, HostListener, inject, Input } from '@angular/core';
import { DoctorProfile, NavLink } from '../../models/clinic-content.model';
import { Router,RouterLink } from "@angular/router";
import {  AppointmentModelService } from '../../services/appointment-model.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [RouterLink]
})
export class NavbarComponent {
  @Input({ required: true }) links: NavLink[] = [];
  @Input({ required: true }) doctor!: DoctorProfile;
constructor(
    private router: Router,
    public modalService: AppointmentModelService 
  ) {
   
  }
  menuOpen = false;
  scrolled = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 12;
  }
// Local controller wrapper method
  triggerGlobalPopup(event: Event): void {
    
    event.preventDefault();
    event.stopPropagation();
    this.modalService.open();
  }
  closeMenu(): void {
    this.menuOpen = false;
  }
}
