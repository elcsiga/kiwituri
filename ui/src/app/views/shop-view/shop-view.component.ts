import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css']
})
export class ShopViewComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  items$ = this.http.get('/api/items');

  ngOnInit() {
  }

}
