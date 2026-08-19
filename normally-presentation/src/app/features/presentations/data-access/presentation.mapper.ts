import { Presentation } from '../domain/presentation.model';
import { PresentationDto } from './presentation.dto';

export function mapPresentationDto(dto: PresentationDto): Presentation {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.summary,
    speaker: dto.speaker_name,
    scheduledAt: new Date(dto.scheduled_at),
    status: dto.status,
  };
}

