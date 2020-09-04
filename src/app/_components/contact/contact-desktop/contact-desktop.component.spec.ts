import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDesktopComponent } from './contact-desktop.component';

describe('ContactDesktopComponent', () => {
  let component: ContactDesktopComponent;
  let fixture: ComponentFixture<ContactDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
