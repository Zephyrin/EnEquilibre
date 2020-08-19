import { ViewTranslateService } from '@app/_services/view-translate.service';
import { Component, OnInit, Input } from '@angular/core';

interface IEdit {
  edit: boolean;
  canEdit: boolean;
}

@Component({
  selector: 'app-tools-edit',
  templateUrl: './tools-edit.component.html',
  styleUrls: ['./tools-edit.component.scss']
})
export class ToolsEditComponent implements OnInit {
  @Input() service: IEdit;
  constructor(
    public vt: ViewTranslateService
  ) { }

  ngOnInit(): void {
  }

}
