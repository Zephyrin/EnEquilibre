import { ViewTranslateService } from '@app/_services/view-translate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-designer-circle',
  templateUrl: './designer-circle.component.html',
  styleUrls: ['./designer-circle.component.scss']
})
export class DesignerCircleComponent implements OnInit {

  constructor(public vt: ViewTranslateService) { }

  ngOnInit(): void {
  }

}
