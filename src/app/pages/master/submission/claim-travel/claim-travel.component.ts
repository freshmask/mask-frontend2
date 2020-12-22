import {Component, OnInit} from '@angular/core';
import {SubmissionService} from '../submission.service';
import Swal from 'sweetalert2';
import {ClaimTravel} from '../../transaction/transaction-model/ClaimTravel.model';
import {AdminService} from '../../admin/admin.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-claim-travel',
  templateUrl: './claim-travel.component.html',
  styleUrls: ['./claim-travel.component.css']
})
export class ClaimTravelComponent implements OnInit {
  page = 1;
  size = 5;
  totalItems;
  isSearch = false;
  searchByName = '';
  loadedPosts: any[];
  valueClaim: number;
  claimTravel: ClaimTravel;
  claimtravel = localStorage.getItem('claimTravel');
  travel = JSON.parse(this.claimtravel);
  numberClaimTravel = 0;
  newData: any;
  claimTravelList: string;
  fileName = 'Claim-travel-' + new Date().toDateString() + '.xlsx';
  isLoading = false;
  isLoadingReject = false;
  isLoadingApprove = false;

  constructor(private submissionService: SubmissionService,
              private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.onGetClaimTravel();
  }

  onGetClaimTravel(){
    this.isLoading = true;
    this.submissionService.getClaimTravel(this.page, this.size)
      .subscribe(data => {
        this.loadedPosts = data.content;
        this.totalItems = data.totalElements;
        this.isLoading = false;
      }, error => {
        alert(error);
      });
  }

  onPageChange(event){
    this.page = event;
    this.onGetClaimTravel();
  }


  rejectedClaimTravel(id){
    Swal.fire({
      title: 'Apakah benar?',
      text: 'Anda ingin menolak klaim',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Ya, Tolak Klaim!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoadingReject = true;
        this.submissionService.rejectedClaimTravel(id)
          .subscribe(data => {
            this.isLoadingReject = false;
            Swal.fire(
              'Berhasil!',
              'Anda berhasil melakukan penolakan klaim',
              'success'
            );
          }, error => {
            this.isLoadingReject = false;
            Swal.fire(
              'Gagal!',
              'Anda gagal melakukan penolakan klaim',
              'error'
            );
          });
      }
    });
  }

  onSendClaimTravel(claimTravel){
    localStorage.setItem('claimTravel', JSON.stringify(claimTravel));
  }

  onApproved(valueClaim){
    this.isLoadingApprove = true;
    this.claimTravel = {
      id: this.travel.id,
      name: this.travel.name,
      email: this.travel.email,
      reportDate: this.travel.reportDate,
      incidentDate: this.travel.incidentDate,
      lossCause: this.travel.lossCause,
      incidentLocation: this.travel.incidentLocation,
      medicalCertificate: this.travel.medicalCertificate,
      medicalCertificateUri: this.travel.medicalExpensesUri,
      medicalExpenses: this.travel.medicalExpenses,
      medicalExpensesUri: this.travel.medicalExpensesUri,
      deathCertificate: this.travel.deathCertificate,
      deathCertificateUri: this.travel.deathCertificateUri,
      claimSubmission: this.travel.claimSubmission,
      claimApproval: valueClaim
    };
    // console.log('ini travid', this.travel.id);
    this.submissionService.approvalClaimTravel(this.travel.id, this.claimTravel)
      .subscribe(data => {
        this.isLoadingApprove = false;
        Swal.fire('Success',
          'Klaim berhasil di setujui',
          'success');
        this.onGetClaimTravel();
      }, error => {
        this.isLoadingApprove = false;
        Swal.fire('Gagal!',
          'Nominal persetujuan klaim yang anda inputkan melebihi jumlah tuntutan user',
          'error');
      });
  }

  downloadMedCertTravel(filename){
    this.submissionService.getMedicalCertificateTravel(filename).subscribe((response) => {
      Swal.fire('Success',
        'Surat Keterangan Dokter Berhasil di Download',
        'success');
    }, error => {
      Swal.fire('Gagal',
        'Gagal Mendownload',
        'error');

    });
  }

  downloadDeathCertTravel(filename){
    if (filename === null){
      Swal.fire('Failed',
        'User tidak melampirkan file',
        'error');
    } else {
      this.submissionService.getDeathCertificateTravel(filename).subscribe((response) => {
        Swal.fire('Success',
          'Surat Kematian Berhasil di Download',
          'success');
      }, error => {
        Swal.fire('Gagal',
          'Gagal Mendownload',
          'error');
      });
    }
  }

  downloadMedExpTravel(filename){
    this.submissionService.getMedicalExpensesTravel(filename).subscribe((response) => {
      Swal.fire('Success',
        'Rincian Biaya Pengobatan Berhasil di Download',
        'success');
    }, error => {
      Swal.fire('Gagal',
        'Gagal Mendownload',
        'error');
    });
  }

  onGetClaimTravelList(){
    this.isLoading = true;
    this.adminService.getClaimTravel()
      .subscribe(data => {
        for (const claimTravel of data) {
          this.isLoading = false;
          if (claimTravel.transaction.transactionTravel.statusClaim === 'Proses Persetujuan'){
            this.numberClaimTravel += 1;
          }
        }
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  searchLive() {
    if (this.searchByName === ''){
      this.isSearch = false;
    }else{
      this.isSearch = true;
    }
    this.adminService.getClaimTravel()
      .subscribe((response) => {
        this.claimTravelList = JSON.stringify(response);
        if (this.newData !== []) {
          this.newData = [];
        }
        for (const claim of JSON.parse(this.claimTravelList)) {
          if (claim.transaction.transactionTravel.id.toLowerCase().indexOf(this.searchByName.toLowerCase()) > -1) {
            this.newData.push(claim);
          }
        }
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  exportexcel() {
    /* table id is passed over here */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
}
