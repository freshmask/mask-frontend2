import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardSubmissionService {

  token = window.sessionStorage.getItem('token');
  x = JSON.parse(this.token);
  role = this.x.user.role;

  constructor(private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.role !== '04'){
      return true;
    }
    else{
      Swal.fire('Gagal',
        'Anda tidak memiliki akses pada halaman ini',
        'error');
      this.route.navigate(['/admin/dashboard']);
    }
  }
}
