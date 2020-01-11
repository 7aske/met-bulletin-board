import { Component, OnInit } from '@angular/core';
import { ManageDialogComponent } from './manage-dialog/manage-dialog.component';
import { MatDialog } from '@angular/material';
import { ManagePollDialogComponent } from './manage-poll-dialog/manage-poll-dialog.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  slides: any = [
    { slideID: 0, slideTitle: "Mnogo dobar title! #1", slideBodyTitle: "Drugo super naslov!", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: undefined },
    { slideID: 1, slideTitle: "Mnogo dobar title! #2", slideBodyTitle: undefined, slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 1, questionText: "Koliko puta pijes kafu nedeljno?", questionOptions: [1, 2, 3, 4, 5] } },
    { slideID: 2, slideTitle: "Mnogo dobar title! #3", slideBodyTitle: "Drugo super naslov!", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 2, questionText: "Koliko puta pijes kafu mesecno?", questionOptions: [1, 2, 3, 4, 5] } },
    { slideID: 3, slideTitle: "Mnogo dobar title! #4", slideBodyTitle: "Drugo super naslov!", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 3, questionText: "Koliko puta pijes kafu godisnje?", questionOptions: [1, 2, 3, 4, 5] } },
    { slideID: 4, slideTitle: "Mnogo dobar title! #5", slideBodyTitle: "Drugo super naslov!", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 4, questionText: "Koliko puta pijes kafu na sat?", questionOptions: [1, 2, 3, 4, 5] } }
  ]

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  getTrimmedText(text: string) {
    return text.substring(0, 150) + "...";
  }

  getAllSlides() {

  }

  openDialogSlide(slide): void {
    const dialogRef = this.dialog.open(ManageDialogComponent, {
      width: '350px',
      data: slide ? slide : ""
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllSlides();
    });
  }

  openDialogPoll(poll) {
    const dialogRef = this.dialog.open(ManagePollDialogComponent, {
      width: '350px',
      data: poll ? poll : ""
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllSlides();
    });
  }

  deleteSlide(slideID) {
    // call api to delete
    console.log("slideID", slideID);

  }

  deletePoll(questionID) {
    // call api to delete
    console.log("questionID", questionID);

  }

}
