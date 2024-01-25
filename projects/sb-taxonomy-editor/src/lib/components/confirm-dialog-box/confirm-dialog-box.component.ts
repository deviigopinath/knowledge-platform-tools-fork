import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FrameworkService } from '../../services/framework.service';

@Component({
  selector: 'confirm-dialog-box',
  templateUrl: './confirm-dialog-box.component.html',
  styleUrls: ['./confirm-dialog-box.component.scss']
})
export class ConfirmDialogBoxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private frameworkService: FrameworkService,
  ) { }

  ngOnInit(): void {}

  removeAssociation() {
    this.frameworkService.isTermExistRemove(this.data);
    this.dialogRef.close();
  }

}
