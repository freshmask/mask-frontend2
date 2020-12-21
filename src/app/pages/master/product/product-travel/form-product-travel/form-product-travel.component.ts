import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {PackageTravelModel} from '../../../../home/model/packageTravel.model';
import {ProdService} from '../../prod.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-product-travel',
  templateUrl: './form-product-travel.component.html',
  styleUrls: ['./form-product-travel.component.css']
})
export class FormProductTravelComponent implements OnInit {
  packageTaForm: FormGroup;
  packageTa: PackageTravelModel;
  loadProduct = [];
  id: string;
  tempId = localStorage.getItem('productId');
  simpanId = [];
  packageTravel;
  tempPtId = localStorage.getItem('packageTravelId');

  constructor(private productService: ProdService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.onChooseProduct();
    this.route.params.subscribe(params => {
      if (params && params.id) {
        const id: string = params.id;
        this.productService.getPackageTaBypackageId(id)
          .subscribe((response) => {
            this.id = id;
            this.setDataToForm(response);
          });
      }
    });

  }

  private buildForm(): void {
    this.packageTaForm = new FormGroup({
      ptId: new FormControl(null),
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      days: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*[1-9][0-9]*$')]),
      price: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*[1-9][0-9]*$')]),
      pricePromo: new FormControl(null, [Validators.pattern('^[0-9]*$')]),
      voucher: new FormControl(null),
      product: new FormControl(this.tempId),
      isActive: new FormControl('true')
    });
  }

  // tslint:disable-next-line:typedef
  ngSubmit(postData, valid: boolean) {
    this.packageTravel = {
      ptId: this.id,
      name: postData.name,
      days: postData.days,
      price: postData.price,
      pricePromo: postData.pricePromo,
      voucher: postData.voucher,
      isActive: postData.isActive,
      product: {
        productId: this.tempId
      }

    };
    if (valid) {
      this.productService.addPackageTa(this.packageTravel, this.id)
        .subscribe(response => {
          Swal.fire('Berhasil',
            'Berhasil menambahkan produk',
            'success');
          this.router.navigate(['/admin/product/travel']);
        }, error => {
          Swal.fire('Gagal',
            'Gagal menambahkan product',
            'error');
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
    this.packageTa = packageTaForm;
    if (this.packageTaForm) {
      this.packageTaForm.get('ptId').setValue(this.packageTa.ptId);
      this.packageTaForm.get('name').setValue(this.packageTa.name);
      this.packageTaForm.get('days').setValue(this.packageTa.days);
      this.packageTaForm.get('price').setValue(this.packageTa.price);
      this.packageTaForm.get('pricePromo').setValue(this.packageTa.pricePromo);
      this.packageTaForm.get('voucher').setValue(this.packageTa.voucher);
      this.packageTaForm.get('product').setValue(this.packageTa.ptId);
      this.packageTaForm.get('isActive').setValue(this.packageTa.isActive);
    }
  }

  form(property): AbstractControl {
    return this.packageTaForm.get(property);
  }
}
