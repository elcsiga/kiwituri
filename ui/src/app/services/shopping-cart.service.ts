import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {ItemRecord} from "../../../../server/src/common/interfaces/item";
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material";
import {CartSheetComponent} from "../components/cart-sheet/cart-sheet.component";
import {HttpClient} from "@angular/common/http";
import {ItemService} from "./item.service";
import {StoreCollection} from "../util/Store";
import {filter, map} from "rxjs/operators";


export interface CartSheetData {
  service: ShoppingCartService;
}

export type CartItem = number;

export interface Order {
  id: number;
  items: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cart = new StoreCollection<CartItem>([]);
  cart$ = this.cart.value$;

  cartItems$: Observable<ItemRecord[]> = combineLatest( this.itemService.item$, this.cart.value$ ).pipe(
    map( ([items, cart]) => items.filter( item => cart.includes(item.id)))
  );

  cartSheetRef: MatBottomSheetRef;

  constructor(
    private bottomSheet: MatBottomSheet,
    private itemService: ItemService
  ) {
  }

  openCartSheet() {
    const data: CartSheetData = {
      service: this
    };

    this.cartSheetRef = this.bottomSheet.open(CartSheetComponent, { data });

    this.cartSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });
  }

  closeCartSheet() {
    if (this.cartSheetRef) {
      this.cartSheetRef.dismiss();
    }
  }

  addToCart(item: ItemRecord) {
    this.cart.append(item.id);
  }

  removeFromCart(item: ItemRecord) {
    this.cart.remove(item.id);
  }

  isInCart(item: ItemRecord) {
    return this.cart.snapshot().includes(item.id);
  }
}
