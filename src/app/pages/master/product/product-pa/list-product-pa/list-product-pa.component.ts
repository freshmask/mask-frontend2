import {Component, OnInit} from '@angular/core';
import {PackagePAModel} from '../../../../home/model/packagePA.model';
import {CategoryPAService} from '../../../../home/category-pa.service';
import {CategoryPAModel} from '../../../../home/model/categoryPA.model';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {ProdService} from '../../prod.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product-pa',
  templateUrl: './list-product-pa.component.html',
  styleUrls: ['./list-product-pa.component.css']
})
export class ListProductPaComponent implements OnInit {

  packagePA: PackagePAModel[] = [];
  categoryPA: CategoryPAModel[] = [];
  isSearch = false;
  searchByName = '';
  productList = [];
  newData;
  tempId;
  statusColor: boolean = false;
  fileName = 'list-product-pa-' + new Date().toDateString() + '.xlsx';


  constructor(private prodService: ProdService,
              private categoryPAService: CategoryPAService,
              private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getPackagesPA();
  }

  // tslint:disable-next-line:typedef
  getPackagesPA() {
    this.prodService.getPackage().subscribe((response) => {
        this.packagePA = response;
      }, error => {
      Swal.fire('Gagal',
        'Gagal Mendapatkan data',
        'error');
      }
    );
  }


  // tslint:disable-next-line:typedef
  onGetCategoryPA(id) {
    if(this.statusColor === false){
      this.statusColor = true;
    }else{
      this.statusColor = false;
    }
    localStorage.setItem('categoriPaId', id);
    this.tempId = localStorage.getItem('categoriPaId');
    this.categoryPAService.getCategoryPA(id).subscribe(data => {
      this.categoryPA = data;
    }, error => {
      alert(error);
    });
  }

  // tslint:disable-next-line:typedef
  editPackage(category: CategoryPAModel){
    this.router.navigateByUrl('/admin/product/pa/form/' + category.categoryId, {state: category});
  }
  // tslint:disable-next-line:typedef
  onChangeStatus(categoryId: string) {
    this.prodService.changeStatusPa(categoryId)
      .subscribe(data => {
        this.getPackagesPA();
      });
  }

  // tslint:disable-next-line:typedef
  onLogout() {
    this.authService.logout();
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
