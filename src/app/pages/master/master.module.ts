import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {AuthGuardService} from './auth-guard.service';



@NgModule({
  declarations: [PagenotfoundComponent, SidebarComponent],
  imports: [
    CommonModule,
    MasterRoutingModule
  ], providers : [AuthGuardService]
})
export class MasterModule { }
