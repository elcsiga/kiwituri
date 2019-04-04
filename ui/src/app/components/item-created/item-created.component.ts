import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-item-created',
  templateUrl: './item-created.component.html',
  styleUrls: ['./item-created.component.css']
})
export class ItemCreatedComponent implements OnInit {

  ngOnInit() {
  }

  constructor(
    public dialogRef: MatDialogRef<ItemCreatedComponent>,
    @Inject(MAT_DIALOG_DATA) public data ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
