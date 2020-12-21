import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagenotfoundComponent} from './pages/master/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      anchorScrolling: 'enabled',
      // useHash: true,
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
