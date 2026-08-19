import { Component, input } from '@angular/core';

import { Presentation } from '../domain/presentation.model';
import { PresentationCard } from './presentation-card';

@Component({
  selector: 'app-presentation-list',
  imports: [PresentationCard],
  templateUrl: './presentation-list.html',
})
export class PresentationList {
  readonly presentations = input.required<readonly Presentation[]>();
}

