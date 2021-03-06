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
  private archiveMode = false;

  loadItems() {
    const url = this.archiveMode ? '/api/items/archive' : '/api/items';
    this.http.get<ItemRecord[]>(url)
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
    this.items.prepend( item );
  }
  remove(item: ItemRecord): void {
    this.items.removeById( item );
  }

  toggleArchiveMode() {
    this.archiveMode = !this.archiveMode;
    this.loadItems();
  }
}
