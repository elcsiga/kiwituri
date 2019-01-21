import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {CartItem, CartSheetData, ShoppingCartService} from "../../services/shopping-cart.service";
import {Router} from "@angular/router";
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material";

@Component({
  selector: 'app-shopping-cart-view',
  templateUrl: './shopping-cart-view.component.html',
  styleUrls: ['./shopping-cart-view.component.css']
})
export class ShoppingCartViewComponent implements OnInit {

  cartItems$: Observable<ItemRecord[]> = this.cartService.cartItems$;

  constructor(
    private cartService: ShoppingCartService,
  ) {

  }

  ngOnInit() {
  }

  removeFromCart(item: ItemRecord) {
    this.cartService.removeFromCart(item);
  }

  buy() {

  }
}
