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

  private resize(evt, firstTime = true): void {
    setTimeout(() => {
      if (this.element !== undefined && this.img !== undefined) {
        this.containerHeight = this.element.nativeElement.offsetHeight;
        const width = this.element.nativeElement.offsetWidth;
        let url = this.service.getUrl(this.name);
        if (width < 1001 && width > 900) { url = url.replace('/media/', '/media/w_1000_'); }
        else if (width < 901 && width > 800) { url = url.replace('/media/', '/media/w_900_'); }
        else if (width < 801 && width > 700) { url = url.replace('/media/', '/media/w_800_'); }
        else if (width < 701 && width > 600) { url = url.replace('/media/', '/media/w_700_'); }
        else if (width < 601 && width > 500) { url = url.replace('/media/', '/media/w_600_'); }
        else if (width < 501 && width > 400) { url = url.replace('/media/', '/media/w_500_'); }
        else if (width < 401 && width > 300) { url = url.replace('/media/', '/media/w_400_'); }
        else if (width < 301 && width > 200) { url = url.replace('/media/', '/media/w_300_'); }
        else if (width < 201 && width > 100) { url = url.replace('/media/', '/media/w_200_'); }
        else if (width < 101) { url = url.replace('/media/', '/media/w_100_'); }
        if (this.img.nativeElement.src !== url) {
          this.img.nativeElement.src = url;
          this.img.nativeElement.onload = () => {
            this.width = this.containerHeight * this.img.nativeElement.naturalWidth / this.img.nativeElement.naturalHeight;
          };
        } else {
          this.width = this.containerHeight * this.img.nativeElement.naturalWidth / this.img.nativeElement.naturalHeight;
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
