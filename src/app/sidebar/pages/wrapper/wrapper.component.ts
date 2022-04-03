import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

interface MenuType {
  routerLink: string,
  icon: string,
  name: string
}

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  actualPage: string = ''
  isExpanded: boolean = false;
  menu: MenuType[] = [
    {
      routerLink: "home",
      icon: "home",
      name: "Home"
    },
    {
      routerLink: "grades",
      icon: "settings",
      name: "Grades"
    }
  ]

  constructor(private _router: Router) { }

  ngOnInit(): void {}

  navigateHome() {
    this._router.navigate(['/home']).then(() => this.actualPage = 'Home')
  }
}
