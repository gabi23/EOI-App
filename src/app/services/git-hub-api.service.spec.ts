import { TestBed } from '@angular/core/testing';

import { GitHubApiService } from './git-hub-api.service';

describe('GitHubApiService', () => {
  let service: GitHubApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitHubApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
