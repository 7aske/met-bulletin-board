import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-slidehow',
  templateUrl: './home-slidehow.component.html',
  styleUrls: ['./home-slidehow.component.css']
})
export class HomeSlidehowComponent implements OnInit {
  slideTimer;
  slideIndex = 0;
  inactiveSeconds = 30;
  timeOnSlideSeconds = 10;

  slides: any = [
    { slideID: 0, slideTitle: "Mnogo dobar title! #1", slideBodyTitle: "Drugo super naslov!", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: undefined },
    { slideID: 1, slideTitle: "Mnogo dobar title! #2", slideBodyTitle: undefined, slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 1, questionText: "Koliko puta pijes kafu nedeljno?", questionOptions: [1, 2, 3, 4, 5] } },
    { slideID: 2, slideTitle: "Mnogo dobar title! #3", slideBodyTitle: "Drugo super naslov!", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 2, questionText: "Koliko puta pijes kafu mesecno?", questionOptions: [1, 2, 3, 4, 5] } },
    { slideID: 3, slideTitle: "Mnogo dobar title! #4", slideBodyTitle: "Drugo super naslov!", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 3, questionText: "Koliko puta pijes kafu godisnje?", questionOptions: [1, 2, 3, 4, 5] } },
    { slideID: 4, slideTitle: "Mnogo dobar title! #5", slideBodyTitle: "Drugo super naslov!", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 4, questionText: "Koliko puta pijes kafu na sat?", questionOptions: [1, 2, 3, 4, 5] } }
  ]

  userActivity;

  userInactive: Subject<any> = new Subject();
  constructor() {
    this.setTimeout();
    this.userInactive.subscribe(() => {
      if (this.slideTimer == undefined)
        this.startSlides();
    });
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), this.inactiveSeconds * 1000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  ngOnInit() {
    this.startSlides();
  }

  onSubmit(forma) {
    console.log(forma);;
  }

  startSlides() {
    this.slideTimer = setInterval(() => {
      this.slideIndex++;
      if (this.slideIndex >= this.slides.length)
        this.slideIndex = 0;

    }, this.timeOnSlideSeconds * 1000);
  }

  stopSlideTimer() {
    clearInterval(this.slideTimer);
    this.slideTimer = undefined;
  }

  goToSlide(index) {
    this.slideIndex = index;
    this.stopSlideTimer();
    // this.startSlides();
  }

  handleNumberInput(event) {
    if (event.key === 'Backspace') return;
    if (event.key <= '0' || event.key >= '9') {
      event.preventDefault();
    }
  }

  sendPollRes(index, sel) {
    console.log(index, sel);

  }

}
