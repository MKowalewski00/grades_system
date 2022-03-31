import { Component, OnInit } from '@angular/core';

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
  isExpanded: boolean = false;
  menu: MenuType[] = [
    {
      routerLink: "home",
      icon: "person",
      name: "Home"
    },
    {
      routerLink: "grades",
      icon: "person",
      name: "Grades"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
