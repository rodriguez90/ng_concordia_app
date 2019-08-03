import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbsCoreComponent } from './fbs-core.component';

describe('FbsCoreComponent', () => {
  let component: FbsCoreComponent;
  let fixture: ComponentFixture<FbsCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbsCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbsCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
