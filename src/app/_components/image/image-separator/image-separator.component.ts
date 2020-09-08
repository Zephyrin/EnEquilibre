import { EditComponent } from '@app/_helpers/edit-component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ViewTranslateService } from '@app/_services/view-translate.service';

@Component({
  selector: 'app-image-separator',
  templateUrl: './image-separator.component.html',
  styleUrls: ['./image-separator.component.scss']
})
export class ImageSeparatorComponent extends EditComponent implements OnInit {
  @Input() name: string;
  constructor(
    public element: ElementRef,
    public vt: ViewTranslateService,
    public dialog: MatDialog
  ) {
    super(vt, dialog);
  }

  ngOnInit(): void {
  }
}
