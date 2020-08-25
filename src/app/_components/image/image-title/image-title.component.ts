import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { RemoveDialogComponent } from '@app/_components/helpers/remove-dialog/remove-dialog.component';
import { ImageDialogComponent } from '@app/_components/image-dialog/image-dialog.component';
import { Mediaobject } from '@app/_models/mediaobject';
import { ViewTranslateService } from '@app/_services/view-translate.service';


interface IService {
  edit: boolean;
  hasImage(name: string): boolean;
  hasError(name: string): boolean;
  hasTitleOrSubtitle(): boolean;
  getUrl(name: string): string;
  getDescription(name: string): string;
  border(name: string): boolean;
  onError(name: string): void;

  get(object: any, name: string): string;

  removeBackground(): void;
  updateBackground(media: Mediaobject): void;
}

@Component({
  selector: 'app-image-title',
  templateUrl: './image-title.component.html',
  styleUrls: ['./image-title.component.scss']
})
export class ImageTitleComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('containerImg', { static: false }) containerImg: ElementRef;
  @ViewChild('img', { static: false }) img: ElementRef;

  @Input() service: IService;
  @Input() name: string;
  @Input() titleName: string;
  @Input() subtitleName: string;

  public width = 100;
  private containerHeight: number;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    public element: ElementRef,
    public vt: ViewTranslateService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this.resize(evt);
    });
  }

  ngAfterViewInit(): void {
    this.resize(null);
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

  onResize(evt): void {
    this.resize(evt);
  }

  private resize(evt): void {
    setTimeout(() => {
      if (this.element !== undefined && this.img !== undefined) {
        this.containerHeight = this.element.nativeElement.offsetHeight;
        this.width = this.containerHeight * this.img.nativeElement.naturalWidth / this.img.nativeElement.naturalHeight;
        if (this.width === undefined) {
          setTimeout(() => {
            this.resize(evt);
          }, 500);
        }
      } else {
        setTimeout(() => {
          this.resize(evt);
        }, 500);
      }
    }, 200);
  }

  openDialog($event: any, name: string) {
    $event.stopPropagation();
    if (this.service.edit) {
      const dialogRef = this.dialog.open(ImageDialogComponent, { data: this.service.get(undefined, name) });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.updateBackground(new Mediaobject(result.data));
        }
      });
    }
  }

  removePicture($event: any, name: string) {
    $event.stopPropagation();
    if (this.service.edit) {
      const dialogRef = this.dialog.open(RemoveDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.data === true) {
            this.service.removeBackground();
          }
        }
      });
    }
  }

}
