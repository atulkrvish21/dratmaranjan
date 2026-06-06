import { Injectable,signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentModelService {

  constructor() { }
  public isOpen = signal<boolean>(false);

  open(): void {
    console.log('Modal Service Triggered: Opening Appointment Popup Window!');
    this.isOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.isOpen.set(false);
    document.body.style.overflow = '';
  }
}
