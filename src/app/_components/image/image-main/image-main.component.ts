import { ViewTranslateService } from '@app/_services/view-translate.service';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './../../../_helpers/edit-component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-main',
  templateUrl: './image-main.component.html',
  styleUrls: ['./image-main.component.scss']
})
export class ImageMainComponent extends EditComponent implements OnInit {

  @Input() name: string;

  constructor(
    public vt: ViewTranslateService,
    public dialog: MatDialog) {
    super(vt, dialog);
  }

  ngOnInit(): void {
  }

}
