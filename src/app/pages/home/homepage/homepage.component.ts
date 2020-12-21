import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isOpen = true;
  time: number = 0;
  interval;

  constructor(private route: Router) {
  }

  ngOnInit(): void {
   this.startTimer();
  }

  // tslint:disable-next-line:typedef
  close() {
    this.route.navigate(['/product/pa']);
  }

  startTimer() {

    this.interval = setInterval(() => {
      this.isOpen = false;
      // this.time++;
    }, 1000);
  }
}
