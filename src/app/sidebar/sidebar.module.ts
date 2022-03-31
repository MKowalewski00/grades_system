import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarRoutingModule } from './sidebar-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { GradesComponent } from './pages/grades/grades.component';
import { WrapperComponent } from './pages/wrapper/wrapper.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { AddgradedialogComponent } from './pages/addgradedialog/addgradedialog.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    WrapperComponent,
    HomeComponent,
    GradesComponent,
    AddgradedialogComponent
  ],
  entryComponents: [AddgradedialogComponent],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: []
})
export class SidebarModule { }
