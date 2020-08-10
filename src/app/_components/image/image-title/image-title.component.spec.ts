import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTitleComponent } from './image-title.component';

describe('ImageTitleComponent', () => {
  let component: ImageTitleComponent;
  let fixture: ComponentFixture<ImageTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
