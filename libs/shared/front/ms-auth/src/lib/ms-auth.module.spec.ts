import { TestBed, waitForAsync } from '@angular/core/testing';
import { MsAuthModule } from './ms-auth.module';

describe('MsAuthModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MsAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MsAuthModule).toBeDefined();
  });
});
