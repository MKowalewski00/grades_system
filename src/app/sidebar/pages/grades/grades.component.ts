import { Component, OnInit } from '@angular/core';
import {Grade} from "../../../model/grade";
import {GradeService} from "../../../service/grade.service";

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  grades: Grade[] = [];


  constructor(private _service: GradeService) { }

  ngOnInit(): void {
    this.loadGrades();
  }

  deleteGrade(id: string) {
    this._service.delete(id).subscribe(() => {this.grades.splice(this.grades.findIndex(index => index.id === id), 1)})
  }

  loadGrades(){
    this._service.getAll().subscribe(
      grades => {
        this.grades = grades;
        this.grades.sort((a, b) => (a.minPercentage < b.minPercentage ? -1 : 1));
      }
    )
  }


  addGrade(minPercentage: number, symbolicGrade: string) {
    this._service.add(minPercentage ,symbolicGrade).subscribe(()=> this.loadGrades(), err => console.log(err))
  }
}
