import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../pages/master/auth/auth.service';
import {Router} from '@angular/router';
import {SubmissionService} from '../../pages/master/submission/submission.service';
import {AdminService} from '../../pages/master/admin/admin.service';

@Component({
  selector: 'app-thesidebar',
  templateUrl: './thesidebar.component.html',
  styleUrls: ['./thesidebar.component.css']
})
export class ThesidebarComponent implements OnInit {

  currentDate = new Date();
  numberClaimPA = 0;
  numberClaimTravel = 0;
  numberClaimPAR = 0;
  totalNumberClaim = 0;
  token = window.sessionStorage.getItem('token');
  x = JSON.parse(this.token);
  name = this.x.user.name;
  totalNumberClaimApp = 0;
  numberClaimPAAprov = 0;
  numberClaimTravelAprov = 0;
  numberClaimPARAprov = 0;

  constructor(private authService: AuthService, private router: Router,
              private adminService: AdminService) { }
  ngOnInit(): void {
    this.onGetClaimPA();
    this.onGetClaimPAR();
    this.onGetClaimTravel();
    this.onGetClaimPAApprov();
    this.onGetClaimPARApprov();
    this.onGetClaimTravelApprov();
  }

  // tslint:disable-next-line:typedef
  onLogout() {
    localStorage.clear();
    sessionStorage.clear();
    this.authService.logout();
  }

  listUser() {
    this.router.navigate(['/admin/user']);
  }

  toDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

  toListAdmin() {
    this.router.navigate(['/admin/dashboard/list']);
  }

  toListAllProduct() {
    this.router.navigate(['/admin/product/all']);
  }

  toListPa() {
    this.router.navigate(['/admin/product/pa']);
  }

  toListPar() {
    this.router.navigate(['/admin/product/property']);
  }

  toListTravel() {
    this.router.navigate(['/admin/product/travel']);
  }

  toListAllTransaction() {
    this.router.navigate(['/admin/transaction']);
  }

  toTransactionByPolis() {
    this.router.navigate(['/admin/transaction/byPolis']);
  }

  toTransactionByPromo() {
    this.router.navigate(['/admin/transaction/byPromo']);
  }

  toTransactionByPolisPeriode() {
    this.router.navigate(['/admin/transaction/byPolisPeriod']);
  }

  toTransactionByUser() {
    this.router.navigate(['/admin/transaction/byUser']);
  }

  toTransacrionTravel() {
    this.router.navigate(['/admin/transaction/talist']);
  }

  toTransactionPAR() {
    this.router.navigate(['/admin/transaction/parlist']);
  }

  toTransactionPA() {
    this.router.navigate(['/admin/transaction/palist']);
  }

  toClaimPA() {
    this.router.navigate(['/admin/submission/claim-pa']);
  }

  toClaimPAR() {
    this.router.navigate(['/admin/submission/claim-par']);
  }

  toClaimTravel() {
    this.router.navigate(['/admin/submission/claim-travel']);
  }

  toClaimPACek() {
    this.router.navigate(['/admin/claim-check/pa']);
  }

  toClaimPARCek() {
    this.router.navigate(['/admin/claim-check/par']);
  }

  toClaimTravelCek() {
    this.router.navigate(['/admin/claim-check/travel']);
  }




  onGetClaimPA(){
    this.adminService.getClaimPA()
      .subscribe(data => {
        for (const claimPA of data) {
          if (claimPA.transaction.transactionPA.statusClaim === 'Proses Persetujuan'){
            this.totalNumberClaim += 1;
            this.numberClaimPA += 1;
          }
        }
      }, error => {
        alert(error);
      });
  }

  onGetClaimPAR(){
    this.adminService.getClaimPAR()
      .subscribe(data => {
        for (const claimPAR of data) {
          if (claimPAR.transaction.transactionPAR.statusClaim === 'Proses Persetujuan'){
            this.totalNumberClaim += 1;
            this.numberClaimPAR += 1;
          }
        }
      }, error => {
        alert(error);
      });
  }

  onGetClaimTravel(){
    this.adminService.getClaimTravel()
      .subscribe(data => {
        for (const claimTravel of data) {
          if (claimTravel.transaction.transactionTravel.statusClaim === 'Proses Persetujuan'){
            this.totalNumberClaim += 1;
            this.numberClaimTravel += 1;
          }
        }
      }, error => {
        alert(error);
      });
  }

  onGetClaimPAApprov(){
    this.adminService.getClaimPA()
      .subscribe(data => {
        for (const claimPA of data) {
          if (claimPA.transaction.transactionPA.statusClaim === 'data sesuai'){
            this.totalNumberClaimApp += 1;
            this.numberClaimPAAprov += 1;
          }
        }
      }, error => {
        alert(error);
      });
  }

  onGetClaimPARApprov(){
    this.adminService.getClaimPAR()
      .subscribe(data => {
        for (const claimPAR of data) {
          if (claimPAR.transaction.transactionPAR.statusClaim === 'data sesuai'){
            this.totalNumberClaimApp += 1;
            this.numberClaimPARAprov += 1;
          }
        }
      }, error => {
        alert(error);
      });
  }

  onGetClaimTravelApprov(){
    this.adminService.getClaimTravel()
      .subscribe(data => {
        for (const claimTravel of data) {
          if (claimTravel.transaction.transactionTravel.statusClaim === 'data sesuai'){
            this.totalNumberClaimApp += 1;
            this.numberClaimTravelAprov += 1;
          }
        }
      }, error => {
        alert(error);
      });
  }

  toProfile() {
    this.router.navigate(['/admin/dashboard/profil']);
  }

  toTransactionByPolisPeriod() {
    this.router.navigate(['/admin/transaction/byPolisPeriod']);
  }
}
