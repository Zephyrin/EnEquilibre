import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalGalleriesComponent } from './vertical-galleries.component';

describe('GalleryComponent', () => {
  let component: VerticalGalleriesComponent;
  let fixture: ComponentFixture<VerticalGalleriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerticalGalleriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalGalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
