import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs";

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

  ngOnInit(): void {
    this.actualPage = this._getCurrentPageName(this._router.url);

    this._router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(url => {
      if(url instanceof RouterEvent) {
        this.actualPage = this._getCurrentPageName(url.url)
      }
    })
  }

  navigateHome() {
    this._router.navigate(['/home']).then(() => this.actualPage = 'Home')
  }

  private _getCurrentPageName(url: string): string {
    return this.menu.find(menuElement => menuElement.routerLink === url.substring(1))?.name || '';
  }
}
