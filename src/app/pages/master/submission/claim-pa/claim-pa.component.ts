import {Component, OnInit} from '@angular/core';
import {SubmissionService} from '../submission.service';
import Swal from 'sweetalert2';
import {ClaimPA} from '../../transaction/transaction-model/ClaimPA.model';
import {AdminService} from '../../admin/admin.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-claim-pa',
  templateUrl: './claim-pa.component.html',
  styleUrls: ['./claim-pa.component.css']
})
export class ClaimPaComponent implements OnInit {

  page = 1;
  size = 5;
  totalItems;
  isSearch = false;
  searchByName = '';
  loadedPosts: any[];
  claimPA: ClaimPA;
  claimpa = localStorage.getItem('claimPA');
  pa = JSON.parse(this.claimpa);
  valueClaim: number;
  newData: any;
  claimPAList: string;
  numberClaimPA = 0;
  fileName = 'Claim-pa-' + new Date().toDateString() + '.xlsx';
  isLoading = false;
  isLoadingReject = false;
  isLoadingApprove = false;

  constructor(private submissionService: SubmissionService,
              private adminService: AdminService) {
  }


  ngOnInit(): void {
    this.onGetClaimPA();
    this.searchLive();
  }

  onGetClaimPA() {
    this.isLoading = true;
    this.submissionService.getClaimPA(this.page, this.size)
      .subscribe(data => {
        this.loadedPosts = data.content;
        this.totalItems = data.totalElements;
        this.isLoading = false;
      }, error => {
        alert(error);
      });
  }

  onPageChange(event) {
    this.page = event;
    this.onGetClaimPA();
  }

  onSendClaimPA(claimpa) {
    localStorage.setItem('claimPA', JSON.stringify(claimpa));
  }

  rejectedClaimPA(id) {
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
        this.submissionService.rejectedClaimPA(id)
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
    this.claimPA = {
      id: this.pa.id,
      name: this.pa.name,
      email: this.pa.email,
      reportDate: this.pa.reportDate,
      incidentDate: this.pa.incidentDate,
      lossCause: this.pa.lossCause,
      incidentLocation: this.pa.incidentLocation,
      claimSubmission: this.pa.claimSubmission,
      claimApproval: valueClaim,
      medicalCertificate: this.pa.medicalCertificate,
      medicalCertificateUri: this.pa.medicalCertificateUri,
      medicalExpenses: this.pa.medicalExpenses,
      medicalExpensesUri: this.pa.medicalExpensesUri,
      deathCertificate: this.pa.deathCertificate,
      deathCertificateUri: this.pa.deathCertificateUri
    };
    // console.log('ini pa id', this.pa.id);
    this.submissionService.approvalClaimPA(this.pa.id, this.claimPA)
      .subscribe(data => {
        this.isLoadingApprove = false;
        Swal.fire('Success',
          'Klaim berhasil di setujui',
          'success');
        this.onGetClaimPA();
        valueClaim = 0;
      }, error => {
        this.isLoadingApprove = false;
        Swal.fire('Gagal!',
          'Anda gagal menyetujui klaim',
          'error');
      });
  }

  downloadMedCertPA(filename){
    this.submissionService.getMedicalCertificatePA(filename).subscribe((response) => {
      Swal.fire('Success',
        'Surat Keterangan Dokter Berhasil di Download',
        'success');
    }, error => {
      Swal.fire('Gagal',
        'Gagal Mendownload',
        'error');
    });
  }

  downloadDeathCertPA(filename){
    if (filename === null){
      Swal.fire('Failed',
        'User tidak melampirkan file',
        'error');
    } else {
      this.submissionService.getDeathCertificatePA(filename).subscribe((response) => {
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

  downloadMedExpPA(filename){
    this.submissionService.getMedicalExpensesPA(filename).subscribe((response) => {
      Swal.fire('Success',
        'Rincian Biaya Pengobatan Berhasil di Download',
        'success');
    }, error => {
      Swal.fire('Gagal',
        'Gagal Mendownload',
        'error');
    });
  }

  onGetClaimPAList(){
    this.adminService.getClaimPA()
      .subscribe(data => {
        for (const claimPA of data) {
          if (claimPA.transaction.transactionPA.statusClaim === 'Proses Persetujuan'){
            this.numberClaimPA += 1;
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
    this.adminService.getClaimPA()
      .subscribe((response) => {
        this.claimPAList = JSON.stringify(response);
        if (this.newData !== []) {
          this.newData = [];
        }
        for (const claim of JSON.parse(this.claimPAList)) {
          if (claim.transaction.transactionPA.trxpaId.toLowerCase().indexOf(this.searchByName.toLowerCase()) > -1) {
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
    Swal.fire('Sukses',
      'Berhasil mendownload yang dibutuhlkan',
      'success');
  }
}
