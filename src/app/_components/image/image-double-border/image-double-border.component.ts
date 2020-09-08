import { Mediaobject } from '@app/_models';
import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image-double-border',
  templateUrl: './image-double-border.component.html',
  styleUrls: ['./image-double-border.component.scss']
})
export class ImageDoubleBorderComponent implements OnInit {

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

  constructor(
    public element: ElementRef
  ) { }

  ngOnInit(): void {
  }

}
