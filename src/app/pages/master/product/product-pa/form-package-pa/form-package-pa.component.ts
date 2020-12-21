import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProdService} from '../../prod.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PackagePAModel} from '../../../../home/model/packagePA.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-package-pa',
  templateUrl: './form-package-pa.component.html',
  styleUrls: ['./form-package-pa.component.css']
})
export class FormPackagePaComponent implements OnInit {
  packagePaForm: FormGroup;
  packagePa: PackagePAModel;
  loadProduct = [];
  id: string;
  tempId = localStorage.getItem('productId');
  simpanId = [];
  packagePA;

  constructor(private productService: ProdService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.onChooseProduct();
    this.route.params.subscribe(params => {
      if (params && params.id) {
        const id: string = params.id;
        this.productService.getPackagePaBypackageId(id)
          .subscribe((response) => {
            this.id = id;
            this.setDataToForm(response);
            // Swal.fire('Berhasil',
            //   'Berhasil menambahkan paket PA',
            //   'success');
            this.router.navigate(['/admin/product/pa']);
          });
      }
    }, error => {
      Swal.fire('Gagal',
        'Gagal menambahkan product',
        'error');
      }
    );

  }

  private buildForm(): void {
    this.packagePaForm = new FormGroup({
      paId: new FormControl(null),
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      compensation: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*[1-9][0-9]*$')]),
      product: new FormControl(this.tempId)
    });
  }

  // tslint:disable-next-line:typedef
  ngSubmit(postData, valid: boolean) {
    this.packagePA = {
      name: postData.name,
      compensation: postData.compensation,
      product: {
        productId: this.tempId
      }
    };
    if (valid) {
      this.productService.addPackagePa(this.packagePA, this.id)
        .subscribe(response => {
          this.router.navigate(['/admin/product/pa']);
        }, error => {
        });
    }
  }


  // tslint:disable-next-line:typedef
  onChooseProduct() {
    this.productService.getProduct()
      .subscribe((data) => {
        this.loadProduct = data;
      });
  }

  private setDataToForm(packageTaForm): void {
    this.packagePa = packageTaForm;
    if (this.packagePaForm) {
      this.packagePaForm.get('paId').setValue(this.packagePa.paId);
      this.packagePaForm.get('name').setValue(this.packagePa.name);
      this.packagePaForm.get('compensation').setValue(this.packagePa.compensation);
      this.packagePaForm.get('product').setValue(this.packagePa.paId);
    }
  }

  form(property): AbstractControl {
    return this.packagePaForm.get(property);
  }

}
