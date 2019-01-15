import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {Observable} from "rxjs";

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css']
})
export class ShopViewComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  items$ = this.http.get<Observable<ItemRecord>>('/api/items');

  ngOnInit() {
  }

}
