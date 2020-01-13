import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatInput } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/apis';

@Component({
  selector: 'app-manage-dialog',
  templateUrl: './manage-dialog.component.html',
  styleUrls: ['./manage-dialog.component.css']
})
export class ManageDialogComponent implements OnInit {

  slide;
  polls: any = [];

  constructor(
    public dialogRef: MatDialogRef<ManageDialogComponent>, @Inject(MAT_DIALOG_DATA) data, private api: ApiService) {

    // if (data !== "")
    //   this.slide = data;

  }

  ngOnInit() {
    this.getAllPoll();
  }

  getAllPoll() {
    this.api.getAllPolls().subscribe(data => {
      this.polls = data['polls'];
    });
  }

  close() {
    this.dialogRef.close();
  }

  save(slideTitle, slideBodyTitle, slideBodyText, slideImageUrl, questionID) {
    // slideTitle.value = "";
    // slideBodyTitle.value = "";
    // slideBodyText.value = "";
    // slideImageUrl.value = "";
    // questionID.value = -1;
    console.log(slideTitle.value, slideBodyTitle.value, slideBodyText.value, slideImageUrl.value, questionID.value);
    this.api.saveSlide({
      slideTitle: slideTitle.value,
      slideBodyTitle: slideBodyTitle.value,
      slideBodyText: slideBodyText.value,
      slideImageUrl: slideImageUrl.value,
      questionID: questionID.value
    }).subscribe(() => {
      this.close();
    });


  }
}
