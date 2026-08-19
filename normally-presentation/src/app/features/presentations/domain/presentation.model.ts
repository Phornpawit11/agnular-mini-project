export type PresentationStatus = 'draft' | 'scheduled' | 'completed';

export interface Presentation {
  id: string;
  title: string;
  description: string;
  speaker: string;
  scheduledAt: Date;
  status: PresentationStatus;
}

