import { getActivePresentations, getPresentationStatusLabel } from './presentation.helpers';
import { Presentation } from './presentation.model';

describe('presentation helpers', () => {
  it('returns Thai labels for presentation statuses', () => {
    expect(getPresentationStatusLabel('draft')).toBe('แบบร่าง');
    expect(getPresentationStatusLabel('scheduled')).toBe('กำลังจะนำเสนอ');
    expect(getPresentationStatusLabel('completed')).toBe('นำเสนอแล้ว');
  });

  it('filters out completed presentations', () => {
    const presentations: Presentation[] = [
      createPresentation('1', 'draft'),
      createPresentation('2', 'scheduled'),
      createPresentation('3', 'completed'),
    ];

    expect(getActivePresentations(presentations).map((item) => item.id)).toEqual(['1', '2']);
  });
});

function createPresentation(id: string, status: Presentation['status']): Presentation {
  return {
    id,
    title: `Presentation ${id}`,
    description: 'Sample description',
    speaker: 'Team Member',
    scheduledAt: new Date('2026-09-01T09:00:00.000Z'),
    status,
  };
}

