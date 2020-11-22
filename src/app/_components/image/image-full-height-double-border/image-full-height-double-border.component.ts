import { IService } from '@app/_services/iservice';
import { MatDialog } from '@angular/material/dialog';
import { ViewTranslateService } from '@app/_services/view-translate.service';
import { RemoveDialogComponent } from '@app/_components/helpers/remove-dialog/remove-dialog.component';
import { Mediaobject } from '@app/_models';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-image-full-height-double-border',
  templateUrl: './image-full-height-double-border.component.html',
  styleUrls: ['./image-full-height-double-border.component.scss']
})
export class ImageFullHeightDoubleBorderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('containerImg', { static: false }) containerImg: ElementRef;
  @ViewChild('img', { static: false }) img: ElementRef;

  /**
   * Use to add a link on the image.
   */
  @Input() routerLink: string | any[];
  /**
   * Use to add a fragment on link when the user click on the image.
   * Only works when it is not in edit mode.
   */
  @Input() fragmentLink: string;

  @Input() image: Mediaobject;

  @Input() title: string;

  @Input() service: IService;

  @Input() child: any;

  public width = 100;

  private containerHeight: number;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  loadObservable$: Observable<Event>;
  loadSubscription$: Subscription;

  constructor(
    public element: ElementRef,
    public vt: ViewTranslateService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this.resize(evt);
    });
  }

  ngOnDestroy() {
    if (this.resizeSubscription$) { this.resizeSubscription$.unsubscribe(); }
    if (this.loadSubscription$) { this.loadSubscription$.unsubscribe(); }
  }

  ngAfterViewInit(): void {
    if (this.img) {
      this.loadObservable$ = fromEvent(this.img.nativeElement, 'load');
      this.loadSubscription$ = this.loadObservable$.subscribe(() => {
        this.onLoadImage();
      });
    }
  }

  onResize(evt): void {
    this.resize(evt);
  }

  removeFromCarrousel(img: Mediaobject) {
    if (this.service.edit) {
      const dialogRef = this.dialog.open(RemoveDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.data === true) {
          this.service.remove(this.child, 'medias', img);
        }
      });
    }
  }

  private resize(evt): void {
    setTimeout(() => {
      if (this.containerHeight && this.img) {
        this.containerHeight = this.containerImg.nativeElement.offsetHeight;
        this.width = this.containerHeight * this.img.nativeElement.naturalWidth / this.img.nativeElement.naturalHeight;
        if (this.width === undefined || this.width === 100) {
          this.resize(evt);
        }
      }
    }, 200);
  }

  public onLoadImage(): void {
    this.containerHeight = this.containerImg.nativeElement.offsetHeight;
    this.width = this.containerHeight * this.img.nativeElement.naturalWidth / this.img.nativeElement.naturalHeight;
  }
}
