import {inject, TestBed} from '@angular/core/testing';

import {SuggestionService} from './suggestion.service';

describe('SuggestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuggestionService]
    });
  });

  it('should be created', inject([SuggestionService], (service: SuggestionService) => {
    expect(service).toBeTruthy();
  }));
});
