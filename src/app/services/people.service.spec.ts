import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { PeopleService } from './people.service';
import { BrowserModule } from '@angular/platform-browser';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BrowserModule,
      ]
    });
    service = TestBed.inject(PeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
