import { Component, OnInit } from '@angular/core';
import { ManageDialogComponent } from './manage-dialog/manage-dialog.component';
import { MatDialog } from '@angular/material';
import { ManagePollDialogComponent } from './manage-poll-dialog/manage-poll-dialog.component';
import { ApiService } from '../apis';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  slides: any = [];
  polls: any = [];

  constructor(public dialog: MatDialog, private api: ApiService) { }

  ngOnInit() {
    this.getAllSlides();
    this.getAllPolls();
  }

  getTrimmedText(text: string) {
    return text.substring(0, 150) + '...';
  }

  getAllSlides() {
    this.api.getAllSlides().subscribe(data => {
      this.slides = (data as any).slides;
    });
  }

  openDialogSlide(slide): void {
    const dialogRef = this.dialog.open(ManageDialogComponent, {
      width: '350px',
      data: slide ? slide : ''
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllSlides();
    });
  }

  openDialogPoll(poll) {
    const dialogRef = this.dialog.open(ManagePollDialogComponent, {
      width: '350px',
      data: poll
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllPolls();
    });
  }

  deleteSlide(slide) {
    this.api.deleteSlide(slide).subscribe(() => {
      this.getAllSlides();
    });

  }
  getAllPolls() {
    this.api.getAllPolls().subscribe(data => {
      this.polls = (data as any).polls;
    });
  }

  deletePoll(poll) {
    // call api to delete
    this.api.deletePoll(poll).subscribe(() => {
      this.getAllPolls();
    });
  }

  logout() {
    this.api.logout();
  }
}
