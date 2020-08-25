import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalMediasComponent } from './horizontal-medias.component';

describe('HorizontalMediasComponent', () => {
  let component: HorizontalMediasComponent;
  let fixture: ComponentFixture<HorizontalMediasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalMediasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
