import { PresentationStatus } from '../domain/presentation.model';

export interface PresentationDto {
  id: string;
  title: string;
  summary: string;
  speaker_name: string;
  scheduled_at: string;
  status: PresentationStatus;
}

