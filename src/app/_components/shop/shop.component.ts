import { ViewTranslate } from './../../_models/view-translate';
import { Component, OnInit } from '@angular/core';
import { ViewTranslateService } from '@app/_services';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(public vt: ViewTranslateService) { }

  ngOnInit(): void {
  }

}
