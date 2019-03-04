import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ConfigService} from "../../services/config.service";
import {ItemService} from "../../services/item.service";
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  @Input() item: ItemRecord;

  constructor(
    private configService: ConfigService,
    private itemService: ItemService,
  ) { }

  ngOnInit() {

  }

  getCategory(): Observable<string> {
    return this.configService.getCategory(this.item.data.category);
  }
  getSize(): Observable<string> {
    return this.configService.getSize(this.item.data.size);
  }
  getSex(): Observable<string> {
    return this.configService.getSex(this.item.data.sex);
  }
}
