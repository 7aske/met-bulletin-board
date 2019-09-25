import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-slidehow',
  templateUrl: './home-slidehow.component.html',
  styleUrls: ['./home-slidehow.component.css']
})
export class HomeSlidehowComponent implements OnInit {
  progressValue = 20;
  constructor() { }

  ngOnInit() {
  }

}
