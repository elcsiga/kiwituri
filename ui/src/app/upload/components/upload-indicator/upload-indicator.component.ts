import {Component, Input, OnInit} from '@angular/core';
import {Report} from "../../services/upload.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-upload-indicator',
  templateUrl: './upload-indicator.component.html',
  styleUrls: ['./upload-indicator.component.css']
})
export class UploadIndicatorComponent implements OnInit {

  @Input() report: Observable<Report>;

  constructor() {

  }

  ngOnInit() {
  }
}
