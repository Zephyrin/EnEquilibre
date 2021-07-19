import { ActivatedRoute } from '@angular/router';
import { NewGalleryComponent } from '@app/_components/gallery/new-gallery/new-gallery.component';
import { ViewTranslateService } from '@app/_services/view-translate.service';
import { GalleryService } from '@app/_services/gallery/gallery.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Gallery } from '@app/_models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { JsonLdComponent } from '@app/_components/tools/json-ld/json-ld.component';

@Component({
  selector: 'app-vertical-galleries',
  templateUrl: './vertical-galleries.component.html',
  styleUrls: ['./vertical-galleries.component.scss']
})
export class VerticalGalleriesComponent implements OnInit, OnDestroy {
  @ViewChild('mainContainer') mainContainer: ElementRef;
  @ViewChild('rightArrow') rightArrow: ElementRef;
  @ViewChild('leftArrow') leftArrow: ElementRef;
  editTitle = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  private scrollAmount = 0;
  private step = 25;
  private speed = 25;
  private slideTimer;
  private resizeObservable$: Observable<Event>;
  private resizeSubscription$: Subscription;
  private spent: Date;

  disabledNext = true;
  disabledPrev = true;

  private fragment;

  private gallerySubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public gallery: GalleryService,
    public vt: ViewTranslateService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.route.fragment.subscribe((fragment: string) => {
      this.fragment = fragment;
    });
    this.isHandset$.subscribe(isHandset => {
      if (isHandset === false) { this.afterViewInit(); }
    });
    this.gallerySubscription = this.gallery.selectedEvt.subscribe(selected => {
      if (selected) {
        setTimeout(() => {
          this.fragment = selected.title.split(' ').join('_');
          this.scrollToFragment();
        }, 500);
      }
    });
  }

  ngOnInit(): void {
    this.spent = new Date();
  }

  ngOnDestroy() {
    if (this.resizeSubscription$) { this.resizeSubscription$.unsubscribe(); }
    if (this.gallery) { this.gallery.edit = false; }
    if (this.gallerySubscription) { this.gallerySubscription.unsubscribe(); }
  }

  afterViewInit() {
    if (this.mainContainer !== undefined) {
      setTimeout(() => {
        this.rightArrow.nativeElement.style.width
          = this.leftArrow.nativeElement.style.width
          = Math.max(this.mainContainer.nativeElement.offsetLeft, 40) + 'px';
        this.scrollToFragment();
      }, 500);
    } else {
      setTimeout(() => { this.afterViewInit(); }, 100);
    }
  }

  private scrollToFragment(): void {
    let offset = 0;
    if (this.fragment) {
      const elt = document.getElementById(this.fragment);
      if (elt !== null) {
        offset = elt.offsetLeft;
        if (this.mainContainer && offset < this.mainContainer.nativeElement.clientWidth) {
          offset = 0;
        }
      }
    }
    this.smoothScroll(offset);
  }

  addGallery() {
    if (this.gallery.edit) {
      const dialogRef = this.dialog.open(NewGalleryComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.gallery.updateOrCreateGallery(new Gallery(result.data), undefined, undefined, undefined);
        }
      });
    }
  }

  divScroll(evt): boolean {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      const currentDate = new Date();
      currentDate.setSeconds(currentDate.getSeconds() - 1);
      if (currentDate <= this.spent) {
        return false;
      }
      this.spent = new Date();
      if (Math.abs(evt.deltaX) > Math.abs(evt.deltaY)) {
        if (evt.deltaX > 0) { this.next(); }
        else { this.previous(); }
      } else {
        if (evt.deltaY > 0) { this.next(); }
        else { this.previous(); }
      }
    }
    return true;
  }

  next(): void {
    const maxScroll = this.mainContainer.nativeElement.scrollLeftMax;

    let offset = this.mainContainer.nativeElement.clientWidth;
    const currentScroll = this.mainContainer.nativeElement.scrollLeft;
    if (currentScroll + offset > maxScroll) {
      if (currentScroll > maxScroll) { offset = - (currentScroll - maxScroll); }
      else { offset = maxScroll - currentScroll; }
    }
    this.scroll(offset);
  }

  previous(): void {
    const minScroll = 0;
    let offset = - this.mainContainer.nativeElement.clientWidth;
    const currentScroll = this.mainContainer.nativeElement.scrollLeft;
    if (currentScroll + offset < minScroll) {
      if (currentScroll < minScroll) { offset = - currentScroll; }
      else { offset = minScroll - currentScroll; }
    }
    this.scroll(offset);
  }

  private scroll(offSet): void {
    if (this.scrollAmount === undefined) {
      this.scrollAmount = offSet;
    } else {
      this.scrollAmount += offSet;
    }
    this.sideScroll();
  }

  private sideScroll() {
    if (this.slideTimer === undefined) {
      this.slideTimer = setInterval(() => {
        if (this.scrollAmount < 0 && this.scrollAmount < - this.step) {
          this.smoothScroll(this.mainContainer.nativeElement.scrollLeft - this.step);
          this.scrollAmount += this.step;
        } else if (this.scrollAmount > 0 && this.scrollAmount > this.step) {
          this.smoothScroll(this.mainContainer.nativeElement.scrollLeft + this.step);
          this.scrollAmount -= this.step;
        } else if (this.scrollAmount < 0) {
          this.smoothScroll(this.mainContainer.nativeElement.scrollLeft + this.scrollAmount);
          this.scrollAmount = 0;
        } else if (this.scrollAmount > 0) {
          this.smoothScroll(this.mainContainer.nativeElement.scrollLeft + this.scrollAmount);
          this.scrollAmount = 0;
        } else {
          clearInterval(this.slideTimer);
          this.slideTimer = undefined;
        }
      }, this.speed);
    }
  }

  private smoothScroll(offSet) {
    if (this.mainContainer === undefined) { return; }
    const currentScroll = this.mainContainer.nativeElement.scrollLeft;
    this.mainContainer.nativeElement.scrollLeft = offSet;
    this.disabledNext = this.mainContainer.nativeElement.scrollLeftMax <= this.mainContainer.nativeElement.scrollLeft;
    this.disabledPrev = this.mainContainer?.nativeElement.scrollLeft === 0;
    /* this.mainContainer.nativeElement.scrollTo({
      top: 0,
      left: offSet,
      behavior: 'smooth'
    }); */
  }


  isLast(): boolean {
    return this.mainContainer.nativeElement.scrollLeft >= this.mainContainer.nativeElement.scrollLeftMax;
  }

  isFirst(): boolean {
    return this.mainContainer.nativeElement.scrollLeft <= 0;
  }

  changeEdit(evt: any): void {
    this.gallery.edit = !this.gallery.edit;
  }

  editJSonLD(evt: any): void {
    const dialogRef = this.dialog.open(JsonLdComponent, { width: '90%', height: '80%', data: { service: this.gallery } });
  }
}
