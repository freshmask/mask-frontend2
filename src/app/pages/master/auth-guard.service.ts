import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  token = window.sessionStorage.getItem('token');
  x = JSON.parse(this.token);
  role = this.x.user.role;

  constructor(private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.role !== '02'){
      return true;
    }else{
      Swal.fire('Gagal',
        'Anda tidak memiliki akses pada halaman ini',
        'error');
      this.route.navigate(['/admin/dashboard']);
    }


  }
}
