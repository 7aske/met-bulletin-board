import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/apis';

@Component({
  selector: 'app-manage-poll-dialog',
  templateUrl: './manage-poll-dialog.component.html',
  styleUrls: ['./manage-poll-dialog.component.css']
})
export class ManagePollDialogComponent implements OnInit {
  poll: any = { questionID: undefined, questionText: '', questionOptions: [] };
  @ViewChild('questText', {static: false}) question: HTMLInputElement;
  @ViewChild('questOpt', {static: false}) txtOpt: HTMLAreaElement;

  constructor(public dialogRef: MatDialogRef<ManagePollDialogComponent>, @Inject(MAT_DIALOG_DATA) data, private api: ApiService) {
    if (data) {
      this.poll = data;
      this.question.value = this.poll.questionText;
    }
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  addQuestOpt(textControl) {
    this.poll.questionOptions.push(textControl.value);
    textControl.value = '';
  }

  removeQuestOpt(index) {
    this.poll.questionOptions.splice(index, 1);
  }

  save(questionText) {
    this.poll.questionText = questionText;
    console.log('poll', this.poll);
    this.api.savePoll(this.poll).subscribe(() => {
      this.close();
    });
  }

}
