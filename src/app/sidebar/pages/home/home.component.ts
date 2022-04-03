import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  actualPage: string = 'Grades';

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  navigate() {
    this._router.navigate(['grades'])
  }
}
