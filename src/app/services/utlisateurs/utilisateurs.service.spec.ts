import { TestBed } from '@angular/core/testing';

import { UtilisateursService } from './utilisateurs.service';

describe('UtilisateursResolver', () => {
  let service: UtilisateursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisateursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
