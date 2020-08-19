import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFullHeightDoubleBorderComponent } from './image-full-height-double-border.component';

describe('ImageFullHeightDoubleBorderComponent', () => {
  let component: ImageFullHeightDoubleBorderComponent;
  let fixture: ComponentFixture<ImageFullHeightDoubleBorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageFullHeightDoubleBorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFullHeightDoubleBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
