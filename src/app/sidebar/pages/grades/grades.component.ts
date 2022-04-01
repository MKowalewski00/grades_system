import { Component, OnInit } from '@angular/core';
import {Grade} from "../../../model/grade";
import {GradeService} from "../../../service/grade.service";
import {MatDialog} from "@angular/material/dialog";
import {AddgradedialogComponent} from "../addgradedialog/addgradedialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface DialogData {
  minPercentage: number;
  symbolicGrade: string;
}


@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  minPercentage: number = 0;
  symbolicGrade: string = '';
  descriptiveGrade: string = '';
  maxPercentage: number = 0;
  id: string = ''
  grades: Grade[] = [];
  isExpanded = true;

  constructor(private _service: GradeService,
              public addGradeDialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadGrades();
  }

  deleteGrade(id: string) {
    this._service.delete(id).subscribe(() => {
      this.grades.splice(this.grades.findIndex(index => index.id === id), 1);
      this.openSnackBar("Deleted Grade")
      this.loadGrades();
      this.resetValues();
    })
  }

  loadGrades(){
    this._service.getAll().subscribe(
      grades => {
        this.grades = grades;
        this.grades.sort((a, b) => (a.minPercentage < b.minPercentage ? -1 : 1));
        for(let i = 0; i < this.grades.length; i++) {
          if(this.grades[i].descriptiveGrade == undefined) {this.grades[i].descriptiveGrade = ''}
          if((i+1) == this.grades.length) {this.grades[i].maxPercentage = 100; break;}
          this.grades[i].maxPercentage = this.grades[i+1].minPercentage - 1;}
      }
    )
  }


  addGrade() {
    const dialogRef = this.addGradeDialog.open(AddgradedialogComponent, {
      data: {minPercentage: this.minPercentage = 0, symbolicGrade: this.symbolicGrade = ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      {
        if(result.minPercentage === null) {
          this.openSnackBar("Minimum Percentage is empty!")
        } else if(result.symbolicGrade === '') {
          this.openSnackBar("Symbolic Grade is empty!")
        }else if(!(this.grades.findIndex(index => index.minPercentage === result.minPercentage) == -1)) {
          console.log("minpercentage is in use")
          this.openSnackBar("Minimum Percentage Is Used!")
        } else {
          this._service.add(result.minPercentage, result.symbolicGrade.toUpperCase()).subscribe(() => {
            this.loadGrades();
            console.log("Added grade")
            this.openSnackBar("Added Grade")
          })
        }
        console.log(result)
      }
    })
  }

  updateGrade(id: string) {
    if(!(id === '')) {
      this._service.update(id, this.minPercentage, this.symbolicGrade.toUpperCase(), this.descriptiveGrade).subscribe(
        () => {
          console.log("updated grade");
          this.openSnackBar("Updated Grade")
          this.loadGrades();
        })
    } else {
      console.log("update grade failed")
      this.openSnackBar("Update Grade Failed!")
    }
  }

  resetValues()
  {
    this.minPercentage = 0;
    this.symbolicGrade = '';
    this.maxPercentage = 0;
    this.descriptiveGrade = '';
  }

  openSnackBar(message: string)
  {
    this._snackBar.open(message, '', {
      horizontalPosition: "center",
      verticalPosition: "top" ,
      duration: 2000,
    })
  }

}
