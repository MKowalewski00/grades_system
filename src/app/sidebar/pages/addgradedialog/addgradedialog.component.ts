import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {addDialogData} from "../grades/grades.component";

@Component({
  selector: 'app-addgradedialog',
  templateUrl: './addgradedialog.component.html',
  styleUrls: ['./addgradedialog.component.scss']
})
export class AddgradedialogComponent implements OnInit {

  constructor(public dialog: MatDialogRef<AddgradedialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: addDialogData) { }

  ngOnInit(): void {
  }

  onCancel()
  {
    this.dialog.close()
  }

}
