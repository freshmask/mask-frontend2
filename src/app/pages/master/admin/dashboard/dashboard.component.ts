import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {TransactionService} from '../../transaction/transaction.service';
// @ts-ignore
import {AdminService} from '../admin.service';
import {Chart} from 'node_modules/chart.js';
import {User} from '../../user/user.model';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts/lib/base-chart.directive';
import {Color} from 'ng2-charts';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService,
              private adminService: AdminService,
              private transactionService: TransactionService,
              private router: Router) { }

  page = 1;
  size = 5;
  totalItems = 2;
  isSearch = false;
  searchByName = '';
  loadedTransaction: any[];
  numberUser: number;
  numberClaimPA: number;
  numberClaimPAR: number;
  numberClaimTravel: number;

  pa: number;
  par: number;
  travel: number;
  sumAllTrans: number;
  sumAllClaim: number;

  transsPa = parseInt(localStorage.getItem('pa'));
  transsTa = parseInt(localStorage.getItem('travel'));
  transsParr = parseInt(localStorage.getItem('par'));


  claimssPa = parseInt(localStorage.getItem('claimPA'));
  claimssTrav = parseInt(localStorage.getItem('claimTravel'));
  claimssPAR = parseInt(localStorage.getItem('claimPAR'));


  ngOnInit(): void {
    this.onGetTransaction();
    this.onGetTransactionPA();
    this.onGetTransactionPAR();
    this.onGetTransactionTravel();
    this.onGetUsers();
    this.onGetClaimPA();
    this.onGetClaimPAR();
    this.onGetClaimTravel();
    this.onGetUserByRole();
    this.sumAllTrans = this.transsPa + this.transsParr + this.transsTa;
    this.sumAllClaim = this.claimssPa + this.claimssPAR + this.claimssTrav;


    const productCanvas = document.getElementById('productChart');
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 14;
    const productData = {
      labels: [
        'Asuransi Kecelakaan Diri',
        'Asuransi Perjalanan',
        'Asuransi Properti/ Harta Benda'
      ],
      datasets: [
        {
          data: [localStorage.getItem('pa'), localStorage.getItem('travel'), localStorage.getItem('par')],
          backgroundColor: [
            '#f9e0ae',
            '#fc8621',
            '#682c0e'
          ]
        }]
    };

    const pieChart = new Chart(productCanvas, {
      type: 'pie',
      data: productData
    });



    const claimCanvas = document.getElementById('claimChart');
    const claimData = {
      labels: [
        'Klaim Produk Asuransi Kecelakaan Diri',
        'Klaim Produk Asuransi Perjalanan',
        'Klaim Produk Asuransi Properti/ Harta Benda'
      ],
      datasets: [
        {
          data: [localStorage.getItem('claimPA'), localStorage.getItem('claimTravel'), localStorage.getItem('claimPAR')],
          backgroundColor: [
            '#965d62',
            '#839b97',
            '#cfd3ce'
          ]
        }]
    };

    const pieChart1 = new Chart(claimCanvas, {
      type: 'pie',
      data: claimData
    });

    const ctx = document.getElementById('barChart');
    const myChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Kecelakaan Diri', 'Perjalanan', 'Properti atau Harta Benda'],
        datasets: [{
          label: 'Angka penjualan',
          data: [localStorage.getItem('pa'), localStorage.getItem('travel'), localStorage.getItem('par')],
          backgroundColor: [
            '#dd9866',
            '#8f384d',
            '#222831'
          ],
          borderColor: [
            '#dd9866',
            '#8f384d',
            '#222831'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              maxRotation: 90,
              minRotation: 80
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });


  }
  onLogout() {
    this.authService.logout();
  }

  onGetTransaction() {
    this.adminService.getAllTransaction()
      .subscribe(data => {
        this.loadedTransaction = data;
      }, error => {
        alert(error);
      });
  }

  onGetTransactionPA() {
    this.adminService.getAllTransactionPAList()
      .subscribe(data => {
        localStorage.setItem('pa', data.length);
      }, error => {
        alert(error);
      });


  }

  onGetTransactionPAR() {
    this.adminService.getAllTransactionPARList()
      .subscribe(data => {
        localStorage.setItem('par', data.length);
      }, error => {
        alert(error);
      });
  }

  onGetTransactionTravel() {
    this.adminService.getAllTransactionTravelList()
      .subscribe(data => {
        localStorage.setItem('travel', data.length);
      }, error => {
        alert(error);
      });
  }

  onGetUsers(){
    this.adminService.getAllUsers()
      .subscribe(data => {
      }, error => {
        alert(error);
      });
  }

  onGetClaimPA(){
    this.adminService.getClaimPA()
      .subscribe(data => {
        localStorage.setItem('claimPA', data.length);
      }, error => {
        alert(error);
      });
  }

  onGetClaimPAR(){
    this.adminService.getClaimPAR()
      .subscribe(data => {
        localStorage.setItem('claimPAR', data.length);
      }, error => {
        alert(error);
      });
  }

  onGetClaimTravel(){
    this.adminService.getClaimTravel()
      .subscribe(data => {
        localStorage.setItem('claimTravel', data.length);
      }, error => {
        alert(error);
      });
  }

  onGetUserByRole(){
    this.adminService.getUserByRole(this.page, this.size, '03')
      .subscribe(data => {
        this.numberUser = data.content.length;
      }, error => {
        alert(error);
      });
  }


  toListUser() {
    this.router.navigate(['/admin/user']);
  }

  toListTrans() {
    this.router.navigate(['/admin/transaction']);
  }

  toListClaim() {
    this.router.navigate(['/admin/submission/claim-pa']);
  }
}
