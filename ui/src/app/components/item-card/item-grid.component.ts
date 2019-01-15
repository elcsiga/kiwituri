import {Component, Input, OnInit} from '@angular/core';
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.css']
})
export class ItemGridComponent implements OnInit {

  @Input() items: ItemRecord[];
  constructor() { }

  ngOnInit() {
  }

}
