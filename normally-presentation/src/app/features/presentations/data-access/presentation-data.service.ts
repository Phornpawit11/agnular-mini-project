import { Injectable } from '@angular/core';

import { Presentation } from '../domain/presentation.model';
import { PresentationDto } from './presentation.dto';
import { mapPresentationDto } from './presentation.mapper';

const PRESENTATION_DTOS: PresentationDto[] = [
  {
    id: 'angular-architecture',
    title: 'Lightweight Angular Architecture',
    summary: 'แนวทางแบ่ง feature, domain และ data-access แบบไม่หนักเกินไป',
    speaker_name: 'Napat',
    scheduled_at: '2026-09-04T03:00:00.000Z',
    status: 'scheduled',
  },
  {
    id: 'signal-state',
    title: 'Signal-based UI State',
    summary: 'ใช้ signal สำหรับ state ในหน้าและ component โดยไม่ต้องเพิ่ม library',
    speaker_name: 'Siriporn',
    scheduled_at: '2026-09-11T03:00:00.000Z',
    status: 'draft',
  },
  {
    id: 'testing-standalone',
    title: 'Testing Standalone Components',
    summary: 'ตัวอย่างการแยก logic ให้ test ได้ง่ายและไม่ผูกกับ UI',
    speaker_name: 'Krit',
    scheduled_at: '2026-08-14T03:00:00.000Z',
    status: 'completed',
  },
];

@Injectable({ providedIn: 'root' })
export class PresentationDataService {
  getPresentations(): Presentation[] {
    return PRESENTATION_DTOS.map(mapPresentationDto);
  }
}

