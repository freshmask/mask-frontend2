import {Component, OnInit} from '@angular/core';
import {SubmissionService} from '../submission.service';
import Swal from 'sweetalert2';
import {ClaimPAR} from '../../transaction/transaction-model/ClaimPAR.model';
import {AdminService} from '../../admin/admin.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-claim-par',
  templateUrl: './claim-par.component.html',
  styleUrls: ['./claim-par.component.css']
})
export class ClaimParComponent implements OnInit {
  valueClaim: number;
  claimPAR: ClaimPAR;
  claimpar = localStorage.getItem('claimPAR');
  par = JSON.parse(this.claimpar);

  page = 1;
  size = 5;
  totalItems;

  isSearch = false;
  searchByName = '';
  loadedPosts: any[];
  numberClaimPAR = 0;
  newData: any;
  claimPARList: string;
  fileName = 'Claim-par-' + new Date().toDateString() + '.xlsx';
  isLoading = false;
  isLoadingReject = false;
  isLoadingApprove = false;

  constructor(private submissionService: SubmissionService,
              private adminService: AdminService) {
  }


  ngOnInit(): void {
    this.onGetClaimPAR();
  }

  onGetClaimPAR() {
    this.isLoading = true;
    this.submissionService.getClaimPAR(this.page, this.size)
      .subscribe(data => {
        this.isLoading = false;
        this.loadedPosts = data.content;
        this.totalItems = data.totalElements;

      }, error => {
        Swal.fire('Gagal',
          'Data tidak ada',
          'error');
      });
  }

  onSendClaimPAR(claimpar){
    localStorage.setItem('claimPAR', JSON.stringify(claimpar));
  }

  onPageChange(event) {
    this.page = event;
    this.onGetClaimPAR();
  }

  rejectedClaimPAR(id) {
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
        this.submissionService.rejectedClaimPAR(id)
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

  onApproved(valueClaim) {
    this.isLoadingApprove = true;
    this.claimPAR = {
      claimparId: this.par.claimparId,
      name: this.par.name,
      email: this.par.email,
      reportDate: this.par.reportDate,
      incidentDate: this.par.incidentDate,
      lossCause: this.par.lossCause,
      incidentLocation: this.par.incidentLocation,
      claimApproval: valueClaim,
      claimSubmission: this.par.claimSubmission,
      buildingType: this.par.buildingType,
      furnitureType: this.par.furnitureType,
      machineType: this.par.machineType,
      lossReportUri: this.par.lossReportUri,
      authoritiesReportUri: this.par.authoritiesReportUri
    };
    this.submissionService.approvalClaimPAR(this.par.claimparId , this.claimPAR)
      .subscribe(data => {
        this.isLoadingApprove = false;
        Swal.fire('Success',
          'Klaim berhasil di setujui',
          'success');
        this.onGetClaimPAR();
        valueClaim = '';
      }, error => {
        this.isLoadingApprove = false;
        Swal.fire('Gagal!',
          'Nominal persetujuan klaim yang anda inputkan melebihi jumlah tuntutan user',
          'error');
      });
  }


  downloadLossReport(filename){
    this.submissionService.getLossReport(filename).subscribe((response) => {
      Swal.fire('Success',
        'Laporan Kerugian di Download',
        'success');
    }, error => {
      Swal.fire('Gagal',
        'Gagal Mendownload',
        'error');
    });
  }

  downloadAuthorReport(filename){
    this.submissionService.getAuthoritiesReport(filename).subscribe((response) => {
      Swal.fire('Success',
        'Laporan Pihak Berwenang Berhasil di Download',
        'success');
    }, error => {
      Swal.fire('Gagal',
        'Gagal Mendownload',
        'error');
    });
  }

  onGetClaimPARList(){
    this.adminService.getClaimPAR()
      .subscribe(data => {
        for (const claimPAR of data) {
          if (claimPAR.transaction.transactionPAR.statusClaim === 'Proses Persetujuan'){
            this.numberClaimPAR += 1;
          }
        }
      }, error => {
        alert(error);
      });
  }

  searchLive() {
    if (this.searchByName === ''){
      this.isSearch = false;
    }else{
      this.isSearch = true;
    }
    this.adminService.getClaimPAR()
      .subscribe((response) => {
        this.claimPARList = JSON.stringify(response);
        if (this.newData !== []) {
          this.newData = [];
        }
        for (const claim of JSON.parse(this.claimPARList)) {
          if (claim.transaction.transactionPAR.trxparId.toLowerCase().indexOf(this.searchByName.toLowerCase()) > -1) {
            this.newData.push(claim);
          }
        }
      }, error => {
        alert(error);
      });
  }

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
