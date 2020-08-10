import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryDesktopComponent } from './gallery-desktop.component';

describe('GalleryDesktopComponent', () => {
  let component: GalleryDesktopComponent;
  let fixture: ComponentFixture<GalleryDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
