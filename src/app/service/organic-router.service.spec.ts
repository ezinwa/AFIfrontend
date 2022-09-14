import { TestBed } from '@angular/core/testing';

import { OrganicRouterService } from './organic-router.service';

describe('OrganicRouterService', () => {
  let service: OrganicRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganicRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
