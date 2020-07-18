import { Mediaobject } from './../../../_models/mediaobject';
import { ViewTranslateService } from './../../../_services/view-translate.service';
import { MediaobjectService } from './../../../_services/Mediaobject/mediaobject.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-image',
  templateUrl: './manage-image.component.html',
  styleUrls: ['./manage-image.component.scss']
})
export class ManageImageComponent implements OnInit {

  constructor(
    public service: MediaobjectService,
    public vt: ViewTranslateService
  ) { }

  ngOnInit(): void {
  }

  selectImg($event: any, img: Mediaobject) {
    $event.stopPropagation();
    this.service.selectImg(img);
  }

  delete($event: any, img: Mediaobject) {
    $event.stopPropagation();
    this.service.delete(img);
  }
}
