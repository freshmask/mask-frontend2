import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-product-par',
  templateUrl: './product-par.component.html',
  styleUrls: ['./product-par.component.css']
})
export class ProductParComponent implements OnInit {
  parCalculatorForm : FormGroup;
  premi:number;
  total:number;
  tempTotal:number;
  totalPremi:number;
  adminFee:number = 12000;
  showResult:boolean = true;

  totalBuilding:number;
  totalMachine:number;
  totalFurniture:number;

  showContentB:boolean = false
  showContentM:boolean = false
  showContentF:boolean = false

  buildingCategoryLoad = [{
    id: "2976",
    name: "Rumah Tinggal Tidak Untuk Usaha dan Tidak Lebih dari 3 Lantai"
  },{
    id: "29761",
    name: "Rumah Tinggal Untuk Usaha Kost"
  }]

  constructOccu = [{
    class:  "1"
  },{
    class:  "2"
  },{
    class:  "3"
  }]

  constructor() { }

  ngOnInit(): void {
    this.formValidation();
  }

  private formValidation():void{
    this.parCalculatorForm = new FormGroup({
      occupation: new FormControl(null, [Validators.required]),
      construction: new FormControl(null, [Validators.required]),
      coverageB: new FormControl(null, [Validators.pattern(/^[0-9]*$/)]),
      coverageM: new FormControl(null, [Validators.pattern(/^[0-9]*$/)]),
      coverageP: new FormControl(null, [Validators.pattern(/^[0-9]*$/)])
    })
  }

  form(property): AbstractControl{
    return this.parCalculatorForm.get(property)
  }

  calculateInsurance(value){
    let values = value.coverageB + value.coverageM + value.coverageP
    if (value.occupation == '2976') {
      if (value.construction == '1'){
        this.tempTotal = (0.294 / 1000) * values;
        this.totalPremi = Math.round(this.tempTotal);
      }
      if (value.construction == '2'){
        this.tempTotal = (0.397 / 1000) * values;
        this.totalPremi = Math.round(this.tempTotal);
      }
      if (value.construction == '3'){
        this.tempTotal = (0.499 / 1000) * values;
        this.totalPremi = Math.round(this.tempTotal);
      }
    } else if (value.occupation == '29761') {
      if (value.construction == '1'){
        this.tempTotal = (0.478 / 1000) * values;
        this.totalPremi = Math.round(this.tempTotal);
      }
      if (value.construction == '2'){
        this.tempTotal = (0.645 / 1000) * values;
        this.totalPremi = Math.round(this.tempTotal);
      }
      if (value.construction == '3'){
        this.tempTotal = (0.812 / 1000) * values;
        this.totalPremi = Math.round(this.tempTotal);
      }
    }
    this.total = this.totalPremi + this.adminFee;

    this.showResult = false
  }

  changeshowContentB(){
    this.showContentB = false
    this.showContentM = true
    this.showContentF = true
  }

  changeshowContentM(){
    this.showContentB = true
    this.showContentM = false
    this.showContentF = true
  }

  changeshowContentF(){
    this.showContentB = true
    this.showContentM = true
    this.showContentF = false
  }
}
