import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {

  @Input() url: string;
  @Input() removable: boolean = true;
  constructor() { }

  @Output() onRemove: EventEmitter<void> = new EventEmitter();
  ngOnInit() {
  }

}
