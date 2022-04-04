import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {updateDialogData} from "../grades/grades.component";

@Component({
  selector: 'app-updategrade',
  templateUrl: './updategrade.component.html',
  styleUrls: ['./updategrade.component.scss']
})
export class UpdategradeComponent implements OnInit {

  constructor(public dialog: MatDialogRef<UpdategradeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: updateDialogData) { }

  ngOnInit(): void {
  }

  onClose()
  {
    this.dialog.close();
    this.data.dialog = false;
  }

}
