import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {ProdService} from '../../prod.service';
import {PackageTravelModel} from '../../../../home/model/packageTravel.model';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-product-travel',
  templateUrl: './list-product-travel.component.html',
  styleUrls: ['./list-product-travel.component.css']
})
export class ListProductTravelComponent implements OnInit {
  loadedData: PackageTravelModel[];
  isSearch = false;
  searchByName = '';
  packageList = [];
  newData;
  tempPtId;
  isLoading = false;
  fileName = 'List-product-travel.xlsx';

  constructor(private authService: AuthService, private productService: ProdService, private router: Router) { }

  ngOnInit(): void {
    this.onGetPackageTA();
  }

  // tslint:disable-next-line:typedef
  onGetPackageTA() {
    this.isLoading = true;
    this.productService.getPackageTravel()
      .subscribe(data => {
        this.loadedData = data;
        this.isLoading = false;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onLogout() {
    this.authService.logout();
  }

  searchLive() {
    if (this.searchByName === ''){
      this.isSearch = false;
    }else{
      this.isSearch = true;
    }
    this.productService.getAllPacckageTaList()
      .subscribe((response: PackageTravelModel[]) => {
        this.newData = response;
        if (this.packageList !== []) {
          this.packageList = [];
        }
        for (const acc of this.newData) {
          if (acc.name.toLowerCase().indexOf(this.searchByName.toLowerCase()) > -1) {
            this.packageList.push({
              ptId: acc.ptId,
              name: acc.name,
              days: acc.days,
              price: acc.price,
              pricePromo: acc.pricePromo,
              voucher: acc.voucher
            });
          }
        }
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  editPackage(pkg: PackageTravelModel){
    this.tempPtId = localStorage.setItem('packageTravelId', pkg.ptId);
    this.router.navigateByUrl('/admin/product/travel/form/' + pkg.ptId, {state: pkg});
  }

  // tslint:disable-next-line:typedef
  onChangeStatus(ptId: string) {
    Swal.fire({
      title: 'Apakah benar?',
      text: 'Anda ingin merubah status aktivasi',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'tidak',
      confirmButtonText: 'Ya, Ubah Status!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.changeStatus(ptId)
          .subscribe(data => {
            this.onGetPackageTA();
            this.searchLive();
          });
        Swal.fire(
          'Berhasil!',
          'Anda sudah merubah status',
          'success'
        );
      }
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
