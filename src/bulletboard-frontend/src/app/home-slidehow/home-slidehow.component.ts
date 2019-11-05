import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-slidehow',
  templateUrl: './home-slidehow.component.html',
  styleUrls: ['./home-slidehow.component.css']
})
export class HomeSlidehowComponent implements OnInit {
  slideTimer;
  slideIndex = 0;

  slides: any = [
    { slideID: 0, slideTitle: "Mnogo dobar title! #1", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 0, questionText: "Koliko puta pijes kafu dnevno?", questionOptions: [1, 2, 3, 4, 5] } },
    { slideID: 1, slideTitle: "Mnogo dobar title! #2", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 1, questionText: "Koliko puta pijes kafu nedeljno?", questionOptions: [1, 2, 3, 4, 5] } },
    { slideID: 2, slideTitle: "Mnogo dobar title! #3", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 2, questionText: "Koliko puta pijes kafu mesecno?", questionOptions: [1, 2, 3, 4, 5] } },
    { slideID: 3, slideTitle: "Mnogo dobar title! #4", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 3, questionText: "Koliko puta pijes kafu godisnje?", questionOptions: [1, 2, 3, 4, 5] } },
    { slideID: 4, slideTitle: "Mnogo dobar title! #5", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 4, questionText: "Koliko puta pijes kafu na sat?", questionOptions: [1, 2, 3, 4, 5] } }
  ]

  constructor() { }

  ngOnInit() {
    this.startSlides();
  }

  startSlides() {
    this.slideTimer = setInterval(() => {
      this.slideIndex++;
      if (this.slideIndex >= this.slides.length)
        this.slideIndex = 0;

      console.log(this.slideIndex);

    }, 5000);
  }

  stopSlideTimer() {
    clearInterval(this.slideTimer);
  }

  goToSlide(index) {
    this.slideIndex = index;
    this.stopSlideTimer();
    this.startSlides();
  }

  handleNumberInput(event) {
    if (event.key === 'Backspace') return;
    if (event.key <= '0' || event.key >= '9') {
      event.preventDefault();
    }
  }

}
