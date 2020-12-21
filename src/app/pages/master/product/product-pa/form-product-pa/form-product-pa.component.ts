import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProdService} from '../../prod.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryPAModel} from '../../../../home/model/categoryPA.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-product-pa',
  templateUrl: './form-product-pa.component.html',
  styleUrls: ['./form-product-pa.component.css']
})
export class FormProductPaComponent implements OnInit {
  categoryPaForm: FormGroup;
  categoryPa: CategoryPAModel;
  loadPackage = [];
  id: string;
  tempPaId = localStorage.getItem('categoriPaId');
  categoriesPA;

  constructor(private productService: ProdService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.onChoosePackage();
    this.route.params.subscribe(params => {
      if (params && params.id) {
        const id: string = params.id;
        this.productService.getCategoryByproductId(id)
          .subscribe((response) => {
            this.id = id;
            this.setDataToForm(response);
          }, error => {
              Swal.fire('Gagal',
                'Gagal menambahkan product',
                'error');
            }
            );
      }
    });
  }

  private buildForm(): void {
    this.categoryPaForm = new FormGroup({
      categoryId: new FormControl(null),
      days: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*[1-9][0-9]*$')]),
      price: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*[1-9][0-9]*$')]),
      pricePromo: new FormControl(null, [Validators.pattern('^[0-9]*$')]),
      voucher: new FormControl(null),
      packagePA: new FormControl(this.tempPaId),
      isActive: new FormControl('true')
    });
  }

  // tslint:disable-next-line:typedef
  ngSubmit(postData, valid: boolean) {
    this.categoriesPA = {
      categoryId: postData.categoryId,
      days: postData.days,
      price: postData.price,
      pricePromo: postData.pricePromo,
      voucher: postData.voucher,
      packagePA: {
        paId: this.tempPaId
      },
      isActive : postData.isActive
    };
    if (valid) {
      this.productService.addCategoryPa(this.categoriesPA, this.id)
        .subscribe(response => {
          Swal.fire('Berhasil',
              'Berhasil menambahkan produk',
              'success');
          this.router.navigate(['/admin/product/pa']);
        }, error => {
          Swal.fire('Gagal',
            'Gagal menambahkan product',
            'error');
        });
    }
  }


  // tslint:disable-next-line:typedef
  onChoosePackage() {
    this.productService.getPackage()
      .subscribe((data) => {
        console.log(data);
        this.loadPackage = data;
      });
  }

  private setDataToForm(categoryPaForm): void {
    this.categoryPa = categoryPaForm;
    if (this.categoryPaForm) {
      this.categoryPaForm.get('categoryId').setValue(this.categoryPa.categoryId);
      this.categoryPaForm.get('days').setValue(this.categoryPa.days);
      this.categoryPaForm.get('price').setValue(this.categoryPa.price);
      this.categoryPaForm.get('pricePromo').setValue(this.categoryPa.pricePromo);
      this.categoryPaForm.get('voucher').setValue(this.categoryPa.voucher);
      this.categoryPaForm.get('packagePA').setValue(this.categoryPa.packagePA.name);
      this.categoryPaForm.get('isActive').setValue(this.categoryPa.isActive);
    }
  }

  form(property): AbstractControl {
    return this.categoryPaForm.get(property);
  }

}
