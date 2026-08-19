import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

import { getPresentationStatusLabel } from '../domain/presentation.helpers';
import { Presentation } from '../domain/presentation.model';

@Component({
  selector: 'app-presentation-card',
  imports: [DatePipe],
  templateUrl: './presentation-card.html',
})
export class PresentationCard {
  readonly presentation = input.required<Presentation>();

  protected readonly statusLabel = computed(() =>
    getPresentationStatusLabel(this.presentation().status),
  );
}

