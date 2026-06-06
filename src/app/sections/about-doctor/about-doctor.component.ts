import { Component, Input, OnInit } from '@angular/core';
import { DoctorProfile } from '../../models/clinic-content.model';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

interface FacultyEvent {
  dateText: string;    // Keeps detailed text: "18th–20th November 2025"
  yearText: string;    // Extracted automatically: "2025"
  role: string;
  title: string;
  location: string;
  tag: string;
  upcoming?: boolean;
}

@Component({
  selector: 'app-about-doctor',
  standalone: true,
  imports: [SectionHeadingComponent],
  templateUrl: './about-doctor.component.html'
})
export class AboutDoctorComponent  implements OnInit  {
  @Input({ required: true }) doctor!: DoctorProfile;

  activeTab: 'international' | 'national' = 'international';
// Raw source dataset
  internationalFacultyRaw = [
    { date: '15th–18th April 2026', role: 'Invited Faculty / Speaker', title: '7th WFSE World Congress of Endoscopic Spine Surgery & MISS', location: 'Hilton Tulum Riviera Maya', tag: '' },
    { date: '18th–20th November 2025', role: 'Invited Faculty', title: '4th International Conference of Libyan Society of Neurosurgery & Spine', location: 'Tripoli', tag: '' },
    { date: '4th–7th September 2025', role: 'Faculty', title: '6th World Congress of Endoscopic Spine Surgery & MISS', location: 'Bariloche, Patagonia', tag: 'International Scientific & Cadaveric Meet' },
    { date: '25th–26th October 2024', role: 'Invited Faculty', title: 'American Society of Endoscopic & Minimally Invasive Spine Surgery Annual Conference', location: 'Jersey City', tag: 'Cadaveric Workshop & Scientific Meeting' },
    { date: '29th–30th October 2022', role: 'Invited Faculty', title: 'IFNE Interim Meeting (NESI & BASS)', location: 'Hyderabad', tag: 'International Participation Platform' }
  ];

  nationalFacultyRaw = [
    { date: 'July 2026', role: 'Invited Faculty', title: '12th MISSABCON & 26th PASMISS Joint Meeting', location: 'Chennai', tag: '' },
    { date: '3rd–5th April 2026', role: 'Faculty', title: 'Neuroendoscopy Mastery Course', location: 'S. Nijalingappa Medical College', tag: 'Cadaveric Workshop' },
    { date: '26th–28th March 2026', role: 'Faculty & Master Dissector', title: 'NEUROENDOCON 2026', location: 'Hotel Royal Orchid', tag: 'Cadaveric Workshop & Scientific Session' },
    { date: '20th–22nd February 2026', role: 'Invited Faculty', title: 'Structured Regional Spine Endoscopy Training Program', location: 'Spinetics Hospital & Research Centre', tag: 'Cadaveric & Advanced Techniques' },
    { date: '10th December 2025', role: 'Faculty', title: 'Cadaveric Spine Endoscopy Workshop, NSICON 2025', location: 'IRCAD Facility, SAIMS', tag: '' },
    { date: '15th–16th November 2025', role: 'Invited Faculty', title: 'UBE Course & Cadaveric Workshop', location: 'Nizam’s Institute of Medical Sciences', tag: 'Preceptorship' },
    { date: '1st–2nd November 2025', role: 'Invited Faculty', title: '16th MISS Update & 7th LIVAD Workshop', location: 'Trinity Hospital', tag: 'Cadaveric / Hands-on' },
    { date: '18th–20th September 2025', role: 'Invited Faculty & Session Chair', title: '28th Annual Conference of Neuro Spinal Surgeons Association of India (NSSA Spine 2025)', location: 'Le Méridien Coimbatore', tag: '' },
    { date: '10th–13th July 2025', role: 'Faculty', title: 'SMISS-AP / MISSAB / BSS Conference', location: 'The Taj Mahal Palace', tag: 'MIS Spine & Endoscopic Modules incl. Cadaveric Workshop' }
  ];

  internationalFaculty: FacultyEvent[] = [];
  nationalFaculty: FacultyEvent[] = [];

  ngOnInit(): void {
    this.internationalFaculty = this.internationalFacultyRaw.map(e => this.processEvent(e));
    this.nationalFaculty = this.nationalFacultyRaw.map(e => this.processEvent(e));
  }

  private processEvent(raw: { date: string, role: string, title: string, location: string, tag: string }): FacultyEvent {
    const year = raw.date.trim().slice(-4);
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const cleanStr = raw.date.toLowerCase();
    const mIdx = months.findIndex(m => cleanStr.includes(m));
    const eventMonth = mIdx !== -1 ? mIdx + 1 : 1;
    const eventYear = parseInt(year, 10) || currentYear;

    let isUpcoming = false;
    if (eventYear > currentYear) isUpcoming = true;
    else if (eventYear === currentYear) isUpcoming = eventMonth >= currentMonth;

    return {
      dateText: raw.date,
      yearText: year,
      role: raw.role,
      title: raw.title,
      location: raw.location,
      tag: raw.tag,
      upcoming: isUpcoming
    };
  }
}
