import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdUpdateDialogComponent } from './ad-update-dialog.component';

describe('AdUpdateDialogComponent', () => {
  let component: AdUpdateDialogComponent;
  let fixture: ComponentFixture<AdUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
