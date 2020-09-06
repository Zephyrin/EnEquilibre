import { ImageDialogComponent } from '@app/_components/image-dialog/image-dialog.component';
import { IService } from '@app/_services/iservice';
import { Mediaobject } from '@app/_models/mediaobject';
import { MatDialog } from '@angular/material/dialog';
import { ViewTranslateService } from '@app/_services/view-translate.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-horizontal-medias',
  templateUrl: './horizontal-medias.component.html',
  styleUrls: ['./horizontal-medias.component.scss']
})
export class HorizontalMediasComponent implements OnInit {
  @ViewChild('scrollDiv') scrollDiv: ElementRef;
  @Input() service: IService;
  @Input() child: any;
  @Input() routerLink: string | any[];
  constructor(
    public vt: ViewTranslateService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  divWheel(evt) {
    if (evt) {
      if (evt.deltaY !== 0 && this.scrollDiv) {
        const scroll = evt.deltaY + this.scrollDiv.nativeElement.scrollLeft;
        if (scroll >= 0 && scroll <= this.scrollDiv.nativeElement.scrollLeftMax) {
          evt.preventDefault();
          evt.stopPropagation();
          this.scrollDiv.nativeElement.scrollLeft = scroll;
        }
      } else {
        evt.stopPropagation();
      }
    }
  }

  addToCarrousel() {
    if (this.service.edit) {
      const dialogRef = this.dialog.open(
        ImageDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.update(this.child, 'medias', new Mediaobject(result.data));
        }
      });
    }
  }

}
