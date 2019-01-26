import { Injectable } from '@angular/core';
import {StoreCollection} from "../util/Store";
import {ItemRecord} from "../../../../server/src/common/interfaces/item";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private items = new StoreCollection<ItemRecord>([]);
  item$ = this.items.value$;

  loadItems() {
    this.http.get<ItemRecord[]>('/api/items')
      .subscribe(items => this.items.set(items));
  }
  constructor(
    private http: HttpClient
  ) {
    this.loadItems();
  }

  update(item: ItemRecord): ItemRecord {
    return this.items.updateById( item );
  }

  add(item: ItemRecord): void {
    this.items.append( item );
  }
  remove(item: ItemRecord): void {
    this.items.removeById( item );
  }
}
