import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-medical-icon',
  standalone: true,
  templateUrl: './medical-icon.component.html',
  styleUrl: './medical-icon.component.scss'
})
export class MedicalIconComponent {
  @Input() name = 'heart-pulse';
}
