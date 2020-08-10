import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFullHeightComponent } from './image-full-height.component';

describe('ImageFullHeightComponent', () => {
  let component: ImageFullHeightComponent;
  let fixture: ComponentFixture<ImageFullHeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageFullHeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFullHeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
