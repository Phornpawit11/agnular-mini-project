import { Presentation, PresentationStatus } from './presentation.model';

export function getPresentationStatusLabel(status: PresentationStatus): string {
  const labels: Record<PresentationStatus, string> = {
    draft: 'แบบร่าง',
    scheduled: 'กำลังจะนำเสนอ',
    completed: 'นำเสนอแล้ว',
  };

  return labels[status];
}

export function getActivePresentations(
  presentations: readonly Presentation[],
): Presentation[] {
  return presentations.filter((presentation) => presentation.status !== 'completed');
}

