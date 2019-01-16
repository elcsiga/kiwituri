import {Component, Input, OnInit} from '@angular/core';
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input() item: ItemRecord;
  constructor() { }

  ngOnInit() {
  }

}
