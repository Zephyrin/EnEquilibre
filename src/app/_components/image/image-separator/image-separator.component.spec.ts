import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSeparatorComponent } from './image-separator.component';

describe('ImageSeparatorComponent', () => {
  let component: ImageSeparatorComponent;
  let fixture: ComponentFixture<ImageSeparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSeparatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
