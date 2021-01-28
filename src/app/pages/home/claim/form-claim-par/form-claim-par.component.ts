import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {SubmissionService} from '../../../master/submission/submission.service';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-claim-par',
  templateUrl: './form-claim-par.component.html',
  styleUrls: ['./form-claim-par.component.css']
})
export class FormClaimParComponent implements OnInit {

  claimPaForm: FormGroup;

  constructor(private submissionService: SubmissionService, private route: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.claimPaForm = new FormGroup({
      id: new FormControl(null),
      polisId: new FormControl(null, [Validators.required]),
      identityNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(16), Validators.minLength(14)]),
      name:  new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      email:  new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      reportDate: new FormControl(null, [Validators.required]),
      incidentDate: new FormControl(null, [Validators.required]),
      lossCause: new FormControl(null, [Validators.required]),
      incidentLocation: new FormControl(null, [Validators.required]),
      claimSubmission: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*[1-9][0-9]*$'), Validators.max(5000000000)]),
      claimApproval: new FormControl(null),
      medicalCertificate: new FormControl(null),
      medicalExpenses: new FormControl(null),
      deathCertificate: new FormControl(null)
    });
  }
  form(property): AbstractControl {
    return this.claimPaForm.get(property);
  }

  addClaimPa(claimData) {
    this.submissionService.createClaimPA(claimData).subscribe(response => {
      Swal.fire('Success',
        'Berhasil Mengajukan Klaim',
        'success');
      this.route.navigate(['/admin']);
    }, error => {
      Swal.fire(
        'Gagal',
        'Gagal mengajukan klaim',
        'error'
      );
    });
  }

  processFile(imageInput: any) {
    if (imageInput.files.length > 0 ){
      const file = imageInput.files[0];
      this.claimPaForm.get('file').setValue(file);
    }
  }

}
