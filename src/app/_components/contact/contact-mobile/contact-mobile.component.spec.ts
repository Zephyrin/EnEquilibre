import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMobileComponent } from './contact-mobile.component';

describe('ContactMobileComponent', () => {
  let component: ContactMobileComponent;
  let fixture: ComponentFixture<ContactMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
