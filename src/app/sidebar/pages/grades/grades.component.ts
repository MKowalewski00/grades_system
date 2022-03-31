import { Component, OnInit } from '@angular/core';
import {Grade} from "../../../model/grade";
import {GradeService} from "../../../service/grade.service";
import {MatDialog} from "@angular/material/dialog";
import {AddgradedialogComponent} from "../addgradedialog/addgradedialog.component";

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
  grades: Grade[] = [];
  gradeView: Grade =  {
    descriptiveGrade: '',
    id: '',
    maxPercentage: 0,
    minPercentage: 0,
    symbolicGrade: ''
  };
  isExpanded = true;

  constructor(private _service: GradeService,
              public addGradeDialog: MatDialog) { }

  ngOnInit(): void {
    this.loadGrades();
  }

  deleteGrade(id: string) {
    this._service.delete(id).subscribe(() => {
      this.grades.splice(this.grades.findIndex(index => index.id === id), 1);
      this.loadGrades();
    })
  }

  loadGrades(){
    this._service.getAll().subscribe(
      grades => {
        this.grades = grades;
        this.grades.sort((a, b) => (a.minPercentage < b.minPercentage ? -1 : 1));
        for(let i = 0; i < this.grades.length; i++)
        {
          if((i+1) == this.grades.length) {
            this.grades[i].maxPercentage = 100;
            break;
          }
          this.grades[i].maxPercentage = this.grades[i+1].minPercentage - 1;
        }
      }
    )
  }


  addGrade() {
    const dialogRef = this.addGradeDialog.open(AddgradedialogComponent, {
      data: {minPercentage: this.minPercentage, symbolicGrade: this.symbolicGrade}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      {
        if(!(this.grades.findIndex(index => index.minPercentage === result.minPercentage) == -1)) {
          console.log("percentage or symbolic grade is in use")
        } else {
          this._service.add(result.minPercentage, result.symbolicGrade).subscribe(() => {
            this.loadGrades();
            console.log("Added grade")
          })
        }
        console.log(result)
      }
    })

  }
}
