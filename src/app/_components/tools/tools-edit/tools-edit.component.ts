import { IService } from '@app/_services/iservice';
import { MatDialog } from '@angular/material/dialog';
import { JsonLdComponent } from './../json-ld/json-ld.component';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-tools-edit',
  templateUrl: './tools-edit.component.html',
  styleUrls: ['./tools-edit.component.scss']
})
export class ToolsEditComponent implements OnInit {
  @Input() service: IService;
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.service.initJSonLD();
  }

  changeEdit(evt: any): void {
    this.service.edit = !this.service.edit;
  }

  editJSonLD(evt: any): void {
    const dialogRef = this.dialog.open(JsonLdComponent, { width: '90%', height: '80%', data: { service: this.service } });
  }
}
