import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerCircleComponent } from './designer-circle.component';

describe('DesignerCircleComponent', () => {
  let component: DesignerCircleComponent;
  let fixture: ComponentFixture<DesignerCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignerCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
