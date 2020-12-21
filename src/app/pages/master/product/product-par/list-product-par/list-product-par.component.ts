import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-list-product-par',
  templateUrl: './list-product-par.component.html',
  styleUrls: ['./list-product-par.component.css']
})
export class ListProductParComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logout();
  }
}
