import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorProfile } from '../../models/clinic-content.model';
import { AppointmentModelService } from '../../services/appointment-model.service';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent {
  @Input({ required: true }) doctor!: DoctorProfile;

  // 1. Inject the global reactive state modal service
 constructor(public modalService: AppointmentModelService) {}
  readonly appointmentForm = new FormBuilder().nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{8,15}$/)]],
    date: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  submitted = false;

  // 2. Add an explicit close action to reset form validation trackers cleanly
  closeModal(): void {
    this.modalService.close();
    this.appointmentForm.reset();
    this.submitted = false;
  }

  submit(): void {
    this.submitted = true;

    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    console.info('Appointment request ready for API:', this.appointmentForm.getRawValue());
    
    // 3. Reset state arrays and close layout overlay seamlessly
    this.appointmentForm.reset();
    this.submitted = false;
    this.modalService.close();
  }

  hasError(controlName: 'name' | 'phone' | 'date' | 'message'): boolean {
    const control = this.appointmentForm.controls[controlName];
    return control.invalid && (control.touched || this.submitted);
  }
}
