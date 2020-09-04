import { IService } from '@app/_helpers/edit-component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-about-desktop',
  templateUrl: './about-desktop.component.html',
  styleUrls: ['./about-desktop.component.scss']
})
export class AboutDesktopComponent implements OnInit {
  @Input() service: IService;
  constructor() { }

  ngOnInit(): void {
  }

}
