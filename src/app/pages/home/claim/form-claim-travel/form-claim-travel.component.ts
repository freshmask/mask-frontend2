import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {SubmissionService} from '../../../master/submission/submission.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ClaimsTravel} from './ClaimsTravel.model';
import {CustomerTravel} from '../../../master/transaction/transaction-model/CustomerTravel.model';

@Component({
  selector: 'app-form-claim-travel',
  templateUrl: './form-claim-travel.component.html',
  styleUrls: ['./form-claim-travel.component.css']
})
export class FormClaimTravelComponent implements OnInit {

  claimTravelForm: FormGroup;
  claimsTravel: ClaimsTravel;
  customerTravel: CustomerTravel;
  polisID: string;

  constructor(private submissionService: SubmissionService, private route: Router) { }

  ngOnInit(): void {
    this.buildForm();

  }

  private buildForm(): void {
    this.claimTravelForm = new FormGroup({
      // id: new FormControl(null),
      polisId: new FormControl(null, [Validators.required]),
      // identityNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(16), Validators.minLength(14)]),
      // nameOfTheInsured:  new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      // emailOfTheInsured:  new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      // heirName:  new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      // heirEmail:  new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
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
    return this.claimTravelForm.get(property);
  }

  addClaimTravel(claimData: ClaimsTravel, valid: boolean) {
    const incDate = new Date(claimData.incidentDate);
    this.claimsTravel = {
      // id: claimData.id,
      nameOfTheInsured: this.customerTravel.name,
      emailOfTheInsured:  this.customerTravel.email,
      identityNumber: this.customerTravel.identityNo,
      heirName: this.customerTravel.heirName,
      heirEmail: this.customerTravel.heirEmail,
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

    if (valid){
      this.submissionService.createClaimTravel(this.claimsTravel).subscribe(response => {
        Swal.fire(' ',
          `${response}`,
          'info');
        this.route.navigate(['/product/travel']);
      }, error => {
        // alert(error.message);
        // Swal.fire(
        //   'Gagal',
        //   'Gagal mengajukan klaim',
        //   'error'
        // );
      });
    }
  }

  processFileDC(imageInput: any) {
    if (imageInput.files.length > 0 ){
      const file = imageInput.files[0];
      this.claimTravelForm.get('deathCertificate').setValue(file);
    }
  }
  processFileMC(imageInput: any) {
    if (imageInput.files.length > 0 ){
      const file = imageInput.files[0];
      this.claimTravelForm.get('medicalCertificate').setValue(file);
    }
  }
  processFileME(imageInput: any) {
    if (imageInput.files.length > 0 ){
      const file = imageInput.files[0];
      this.claimTravelForm.get('medicalExpenses').setValue(file);
    }
  }

  onGetCustomerPAByPolisId(id) {
    this.submissionService.getCustomerTravelbyPolisId(id)
      .subscribe(data => {
        this.customerTravel = data;
      }, error => {
          Swal.fire(
            'Gagal',
            'Nomor polis yang anda masukkan tidak tersedia',
            'error'
          );
      });
  }

  testForm(values){
    console.log(values);
  }
}
