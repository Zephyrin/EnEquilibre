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

  public width: number;

  private containerHeight: number;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this.resize(evt);
    });
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.resize(null);
  }

  onResize(evt): void {
    this.resize(evt);
  }

  private resize(evt): void {
    setTimeout(() => {
      this.containerHeight = this.containerImg.nativeElement.offsetHeight;
      this.width = this.containerHeight * this.img.nativeElement.naturalWidth / this.img.nativeElement.naturalHeight;
      if (this.width === undefined) {
        setTimeout(() => {
          this.resize(evt);
        }, 100);
      }
    }, 100);
  }
}
