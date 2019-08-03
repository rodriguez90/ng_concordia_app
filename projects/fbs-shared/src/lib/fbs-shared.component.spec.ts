import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbsSharedComponent } from './fbs-shared.component';

describe('FbsSharedComponent', () => {
  let component: FbsSharedComponent;
  let fixture: ComponentFixture<FbsSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbsSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbsSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
