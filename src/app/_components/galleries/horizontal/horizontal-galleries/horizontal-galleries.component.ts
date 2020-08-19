import { GalleryService } from './../../../../_services/gallery/gallery.service';
import { Component, OnInit, Input } from '@angular/core';

interface ServiceInterface {
  edit: boolean;
}

@Component({
  selector: 'app-horizontal-galleries',
  templateUrl: './horizontal-galleries.component.html',
  styleUrls: ['./horizontal-galleries.component.scss']
})
export class HorizontalGalleriesComponent implements OnInit {
  @Input() service: ServiceInterface;
  @Input() child: any;
  @Input() routerLink: string | any[];
  constructor(public galleries: GalleryService) { }

  ngOnInit(): void {
  }

  divWheel(evt) {
    if (evt) {
      if (evt.deltaY === 0) {
        evt.stopPropagation();
      }
    }
  }

}
