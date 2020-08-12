import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDoubleBorderComponent } from './image-double-border.component';

describe('ImageDoubleBorderComponent', () => {
  let component: ImageDoubleBorderComponent;
  let fixture: ComponentFixture<ImageDoubleBorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDoubleBorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDoubleBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
