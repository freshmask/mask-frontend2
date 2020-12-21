import { Component, OnInit } from '@angular/core';
import {CategoryPAService} from '../../category-pa.service';
import {CategoryPAModel} from '../../model/categoryPA.model';
import {PackageTravelModel} from '../../model/packageTravel.model';

@Component({
  selector: 'app-product-travel',
  templateUrl: './product-travel.component.html',
  styleUrls: ['./product-travel.component.css']
})
export class ProductTravelComponent implements OnInit {
  loadedData: PackageTravelModel[] = [];

  constructor(private categoryPAService: CategoryPAService) { }

  ngOnInit(): void {
    this.onGetPackagePA()
  }

  // tslint:disable-next-line:typedef
  onGetPackagePA() {

    this.categoryPAService.getPackageTravel()
      .subscribe(data => {
        this.loadedData = data;
      }, error => {
        alert(error);
      });
  }

}
