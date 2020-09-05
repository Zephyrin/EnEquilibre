import { FormGroup, FormBuilder } from '@angular/forms';
import { ViewTranslateService } from '@app/_services/view-translate.service';
import { IService } from '@app/_helpers/edit-component';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact-mobile',
  templateUrl: './contact-mobile.component.html',
  styleUrls: ['./contact-mobile.component.scss']
})
export class ContactMobileComponent implements OnInit {
  @Input() service: IService;
  @ViewChild('input') input: ElementRef;

  editEmail = false;
  editTitle = false;
  form: FormGroup;
  constructor(
    public vt: ViewTranslateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({});
  }


  onSubmitEmail($event: any): void {
    $event.stopPropagation();
    this.editEmail = false;
    const email = this.input.nativeElement.value;
    this.service.update(null, 'email', email);
  }

  editionEmail($event: any) {
    $event.stopPropagation();
    this.input.nativeElement.value = this.service.get(null, 'email');
    this.editEmail = true;
  }

  stopEdition($event: any) {
    $event.stopPropagation();
    this.editEmail = false;
  }
  stopPropagation($event: any) {
    $event.stopPropagation();
  }

  isEditEmail() {
    return this.service.edit && this.editEmail;
  }

}
