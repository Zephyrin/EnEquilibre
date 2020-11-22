import { ViewTranslateService } from '@app/_services/view-translate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(public vt: ViewTranslateService) { }

  ngOnInit(): void {
  }

}
