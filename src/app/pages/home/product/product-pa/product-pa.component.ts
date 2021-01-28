import { Component, OnInit } from '@angular/core';
import {CategoryPAService} from '../../category-pa.service';
import {CategoryPAModel} from '../../model/categoryPA.model';
import {PackagePAModel} from '../../model/packagePA.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-pa',
  templateUrl: './product-pa.component.html',
  styleUrls: ['./product-pa.component.css']
})
export class ProductPaComponent implements OnInit {
  loadedData: CategoryPAModel[] = [];
  loadedPackagePA: PackagePAModel[] = [];
  packagePAName: string;
  tempId = localStorage.getItem('packagePAId');


  constructor(private categoryPAService: CategoryPAService, private route: Router) { }

  ngOnInit(): void {
    this.onGetCategoryPA(localStorage.getItem('packagePAId'));
    this.onGetPackagePA();
  }

  // tslint:disable-next-line:typedef
  onGetCategoryPA(id) {
    localStorage.setItem('packagePAId', id);
    this.categoryPAService.getCategoryPA(id)
      .subscribe(data => {
        this.loadedData = data;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onGetPackagePA() {

    this.categoryPAService.getPackagePA()
      .subscribe(data => {
        this.loadedPackagePA = data;
      }, error => {
        alert(error);
      });
  }
}
