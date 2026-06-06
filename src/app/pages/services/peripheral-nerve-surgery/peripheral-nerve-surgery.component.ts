
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClinicContentService } from 'src/app/services/clinic-content.service';
import { AppointmentComponent } from 'src/app/sections/appointment/appointment.component';
import { FooterComponent } from 'src/app/sections/footer/footer.component';

import { NavbarComponent } from 'src/app/sections/navbar/navbar.component';
import { ScrollRevealDirective } from 'src/app/shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-peripheral-nerve-surgery',
  imports: [
    AsyncPipe,
    FooterComponent,
    NavbarComponent,
    AppointmentComponent,
    ScrollRevealDirective
  ],
  templateUrl: './peripheral-nerve-surgery.component.html',
  styleUrl: './peripheral-nerve-surgery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeripheralNerveSurgeryComponent {
private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();
  conditions = [
    'Carpal Tunnel Syndrome',
    'Ulnar Neuropathy (Cubital Tunnel)',
    'Peroneal Nerve Compression (Foot Drop)',
    'Brachial Plexus Injuries',
    'Peripheral Nerve Tumors',
    'Traumatic Nerve Injuries',
    'Meralgia Paresthetica',
    'Tarsal Tunnel Syndrome'
  ];

  procedures = [
    'Carpal Tunnel Release (Open/Endoscopic)',
    'Ulnar Nerve Decompression & Transposition',
    'Nerve Repair & Grafting',
    'Nerve Transfer for Brachial Plexus',
    'Neurolysis & Decompression',
    'Peripheral Nerve Tumor Excision'
  ];
  peripheraldata = [
    {
      icon: '✋',
      title: 'Carpal Tunnel Syndrome',
      description:
        'Numbness, tingling and weakness in the hand caused by median nerve compression at the wrist.'
    },
    {
      icon: '💪',
      title: 'Cubital Tunnel Syndrome',
      description:
        'Ulnar nerve compression at the elbow causing numbness, weakness and muscle wasting.'
    },
    {
      icon: '🦶',
      title: 'Foot Drop',
      description:
        'Peroneal nerve compression causing difficulty lifting the front of the foot.'
    },
    {
      icon: '🔄',
      title: 'Brachial Plexus Injuries',
      description:
        'Complex nerve injuries affecting arm and hand function after trauma or birth injury.'
    },
    {
      icon: '⚠️',
      title: 'Meralgia Paresthetica',
      description:
        'Compression of the lateral femoral cutaneous nerve causing thigh pain and numbness.'
    },
    {
      icon: '🎯',
      title: 'Peripheral Nerve Tumors',
      description:
        'Schwannomas and neurofibromas causing pain, weakness or neurological symptoms.'
    }
  ];
}
