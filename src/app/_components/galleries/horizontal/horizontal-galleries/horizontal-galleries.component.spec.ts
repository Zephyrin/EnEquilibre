import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalGalleriesComponent } from './horizontal-galleries.component';

describe('HorizontalGalleriesComponent', () => {
  let component: HorizontalGalleriesComponent;
  let fixture: ComponentFixture<HorizontalGalleriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalGalleriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalGalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
