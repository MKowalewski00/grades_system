import { Component, OnInit } from '@angular/core';
import {Grade} from "../../../model/grade";
import {GradeService} from "../../../service/grade.service";
import {MatDialog} from "@angular/material/dialog";
import {AddgradedialogComponent} from "../addgradedialog/addgradedialog.component";

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  grades: Grade[] = [];
  gradeView: Grade =  {
    descriptiveGrade: '',
    id: '',
    maxPercentage: 0,
    minPercentage: 0,
    symbolicGrade: ''
  };
  isExpanded = true;

  constructor(private _service: GradeService, public addGradeDialog: MatDialog) { }

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
    this.addGradeDialog.open(AddgradedialogComponent)
  }
}
