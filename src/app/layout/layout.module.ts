import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThesidebarComponent } from './thesidebar/thesidebar.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ThesidebarComponent],
  exports: [
    ThesidebarComponent, RouterModule
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
