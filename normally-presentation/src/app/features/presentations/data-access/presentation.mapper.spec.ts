import { mapPresentationDto } from './presentation.mapper';

describe('mapPresentationDto', () => {
  it('maps API-shaped fields into the domain model', () => {
    const presentation = mapPresentationDto({
      id: 'intro-angular',
      title: 'Intro to Angular',
      summary: 'Architecture overview',
      speaker_name: 'Somchai',
      scheduled_at: '2026-09-10T10:00:00.000Z',
      status: 'scheduled',
    });

    expect(presentation).toEqual({
      id: 'intro-angular',
      title: 'Intro to Angular',
      description: 'Architecture overview',
      speaker: 'Somchai',
      scheduledAt: new Date('2026-09-10T10:00:00.000Z'),
      status: 'scheduled',
    });
  });
});

