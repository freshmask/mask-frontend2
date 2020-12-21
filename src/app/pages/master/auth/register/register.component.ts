import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  isErrorValidation: boolean = false;
  errorPassword: string;
  passwordFirst: string;
  passwordSecond: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.registerForm = new FormGroup({
      id: new FormControl(null),
      role: new FormControl('02'),
      isActive: new FormControl('false'),
      idCardNo: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(16), Validators.minLength(14)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      birthdate: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(13)]),
      photo: new FormControl(null)
    });
  }

  form(property): AbstractControl {
    return this.registerForm.get(property);
  }

  // tslint:disable-next-line:typedef
  passwordMatch() {
    if (this.passwordSecond !== this.passwordFirst) {
      this.errorPassword = 'Password does not match';
      this.isErrorValidation = true;
    } else {
      this.isErrorValidation = false;
    }
  }

  // tslint:disable-next-line:typedef
  addUser(userData) {
    this.authService.createUser(userData).subscribe(response => {
      Swal.fire('Success',
        'Berhasil Mendaftar',
        'success');
      this.router.navigate(['/admin']);
    }, error => {
      Swal.fire(
        'Failed',
        'Nomor telepon atau nomor identitas atau email sudah terdaftar',
        'error'
      );
    });
  }

  // tslint:disable-next-line:typedef
  processFile(imageInput: any) {
    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      this.registerForm.get('file').setValue(file);
    }
  }


}
