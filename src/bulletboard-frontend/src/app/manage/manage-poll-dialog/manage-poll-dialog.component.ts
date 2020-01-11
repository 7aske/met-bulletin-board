import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-manage-poll-dialog',
  templateUrl: './manage-poll-dialog.component.html',
  styleUrls: ['./manage-poll-dialog.component.css']
})
export class ManagePollDialogComponent implements OnInit {
  poll: any = { questionID: undefined, questionText: "", questionOptions: [] };

  constructor(public dialogRef: MatDialogRef<ManagePollDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {

    if (data !== "")
      this.poll = data;

  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  addQuestOpt(textControl) {
    this.poll.questionOptions.push(textControl.value);
    textControl.value = "";
  }

  removeQuestOpt(index) {
    this.poll.questionOptions.splice(index, 1);
  }

  save(questionText) {
    // send 'poll' to api

    this.poll.questionText = questionText;
    console.log("poll", this.poll);
  }

}
