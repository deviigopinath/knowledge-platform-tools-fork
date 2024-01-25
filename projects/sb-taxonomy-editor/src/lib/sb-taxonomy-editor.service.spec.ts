import { TestBed } from '@angular/core/testing';

import { SbTaxonomyEditorService } from './sb-taxonomy-editor.service';

describe('SbTaxonomyEditorService', () => {
  let service: SbTaxonomyEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SbTaxonomyEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
