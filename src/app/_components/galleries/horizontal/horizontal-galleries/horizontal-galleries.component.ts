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
  constructor(public galleries: GalleryService) { }

  ngOnInit(): void {
  }

}
