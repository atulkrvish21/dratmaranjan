import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { ClinicContent } from '../models/clinic-content.model';

@Injectable({ providedIn: 'root' })
export class ClinicContentService {
  private readonly http = inject(HttpClient);
  private readonly content$ = this.http
    .get<ClinicContent>('assets/data/clinic-content.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  getContent(): Observable<ClinicContent> {
    return this.content$;
  }
}
