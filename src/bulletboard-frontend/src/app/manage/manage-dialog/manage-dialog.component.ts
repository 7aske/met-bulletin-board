import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-manage-dialog',
  templateUrl: './manage-dialog.component.html',
  styleUrls: ['./manage-dialog.component.css']
})
export class ManageDialogComponent implements OnInit {

  slide;
  slideForm: FormGroup;

  polls: any = [
    { questionID: 1, questionText: "Koliko puta pijes kafu nedeljno?", questionOptions: [1, 2, 3, 4, 5] },
    { questionID: 2, questionText: "Koliko puta pijes kafu mesecno?", questionOptions: [1, 2, 3, 4, 5] },
    { questionID: 3, questionText: "Koliko puta pijes kafu godisnje?", questionOptions: [1, 2, 3, 4, 5] },
    { questionID: 4, questionText: "Koliko puta pijes kafu na sat?", questionOptions: [1, 2, 3, 4, 5] }
  ]

  constructor(
    public dialogRef: MatDialogRef<ManageDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {

    if (data !== "")
      this.slide = data;

    this.slideForm = new FormGroup({
      slideTitle: new FormControl(''),
      slideBodyTitle: new FormControl(''),
      slideBodyText: new FormControl(''),
      slideImageUrl: new FormControl(''),
      questionID: new FormControl('')
    });
  }

  ngOnInit() {

  }

  close() {
    this.dialogRef.close();
  }

  save() {
    console.log(this.slideForm.value);
  }
}
