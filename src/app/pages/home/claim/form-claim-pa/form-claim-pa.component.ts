import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {SubmissionService} from '../../../master/submission/submission.service';
import {Router} from '@angular/router';
import {ClaimsPA} from './ClaimsPA.model';
import {CustomerPA} from '../../../master/transaction/transaction-model/CustomerPA.model';

@Component({
  selector: 'app-form-claim-pa',
  templateUrl: './form-claim-pa.component.html',
  styleUrls: ['./form-claim-pa.component.css']
})
export class FormClaimPaComponent implements OnInit {
  claimPaForm: FormGroup;
  claimsPA: ClaimsPA;
  customerPA: CustomerPA;
  polisID: string;

  constructor(private submissionService: SubmissionService, private route: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.claimPaForm = new FormGroup({
      polisId: new FormControl(null, [Validators.required]),
      identityNumber: new FormControl(null),
      nameOfTheInsured:  new FormControl(null),
      emailOfTheInsured:  new FormControl(null),
      heirName:  new FormControl(null),
      heirEmail:  new FormControl(null),
      reportDate: new FormControl(new Date(), [Validators.required]),
      incidentDate: new FormControl(new Date(), [Validators.required]),
      lossCause: new FormControl(null, [Validators.required]),
      incidentLocation: new FormControl(null, [Validators.required]),
      claimSubmission: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*[1-9][0-9]*$'), Validators.max(5000000000)]),
      claimApproval: new FormControl(0),
      medicalCertificate: new FormControl(null),
      medicalExpenses: new FormControl(null),
      deathCertificate: new FormControl(null)
    });
  }

  form(property): AbstractControl {
    return this.claimPaForm.get(property);
  }

  addClaimPa(claimData, valid: boolean): void {
    const incDate = new Date(claimData.incidentDate);
    this.claimsPA = {
      // id: claimData.id,
      nameOfTheInsured: this.customerPA.name,
      emailOfTheInsured:  this.customerPA.email,
      identityNumber: this.customerPA.identityNo,
      heirName: this.customerPA.heirName,
      heirEmail: this.customerPA.heirEmail,
      reportDate: claimData.reportDate,
      incidentDate: incDate,
      lossCause: claimData.lossCause,
      incidentLocation: claimData.incidentLocation,
      claimSubmission: claimData.claimSubmission,
      claimApproval: claimData.claimApproval,
      polisId: claimData.polisId,
      medicalCertificate: claimData.medicalCertificate,
      // medicalCertificateUri: claimData.medicalCertificateUri,
      medicalExpenses: claimData.medicalExpenses,
      // medicalExpensesUri: claimData.medicalExpensesUri,
      deathCertificate: claimData.deathCertificate,
      // deathCertificateUri: claimData.deathCertificateUri
    };

    if (valid) {
      this.submissionService.createClaimPA(this.claimsPA).subscribe(response => {
        Swal.fire('Success',
          'Berhasil Mengajukan Klaim',
          'success');
        this.route.navigate(['/']);
      }, error => {
        Swal.fire(
          'Gagal',
          'Gagal mengajukan klaim',
          'error'
        );
      });
    }
  }

  processFileDC(imageInput: any) {
    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      this.claimPaForm.get('deathCertificate').setValue(file);
    }
  }

  processFileMC(imageInput: any) {
    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      this.claimPaForm.get('medicalCertificate').setValue(file);
    }
  }

  processFileME(imageInput: any) {
    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      this.claimPaForm.get('medicalExpenses').setValue(file);
    }
  }

  onGetCustomerPAByPolisId(id) {
    this.submissionService.getCustomerPAbyPolisId(id)
      .subscribe(data => {
        this.customerPA = data;
      }, error => {
          Swal.fire(
            'Gagal',
            'Nomor polis yang anda masukkan tidak tersedia',
            'error'
          );
      });
  }
}
