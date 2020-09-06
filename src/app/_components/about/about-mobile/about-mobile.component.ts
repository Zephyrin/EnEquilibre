import { IService } from '@app/_services/iservice';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-about-mobile',
  templateUrl: './about-mobile.component.html',
  styleUrls: ['./about-mobile.component.scss']
})
export class AboutMobileComponent implements OnInit {
  @Input() service: IService;

  constructor() { }

  ngOnInit(): void {
  }

}
