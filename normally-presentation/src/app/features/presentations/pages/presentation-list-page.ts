import { Component, computed, inject, signal } from '@angular/core';

import { PresentationDataService } from '../data-access/presentation-data.service';
import { getActivePresentations } from '../domain/presentation.helpers';
import { Presentation } from '../domain/presentation.model';
import { PresentationList } from '../ui/presentation-list';

@Component({
  selector: 'app-presentation-list-page',
  imports: [PresentationList],
  templateUrl: './presentation-list-page.html',
})
export class PresentationListPage {
  private readonly presentationDataService = inject(PresentationDataService);

  protected readonly presentations = signal<Presentation[]>(
    this.presentationDataService.getPresentations(),
  );

  protected readonly activePresentations = computed(() =>
    getActivePresentations(this.presentations()),
  );
}

