import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material";
import {CartItem, CartSheetData, ShoppingCartService} from "../../services/shopping-cart.service";
import {Observable} from "rxjs";
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-sheet',
  templateUrl: './cart-sheet.component.html',
  styleUrls: ['./cart-sheet.component.css']
})
export class CartSheetComponent implements OnInit {

  cartItems$: Observable<ItemRecord[]>;

  private cartService: ShoppingCartService;

  constructor(
    private router: Router,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: CartSheetData
  ) {
    this.cartService = data.service;
    this.cartItems$ = this.cartService.cartItems$;
  }

  ngOnInit() {
  }

  close() {
    this.cartService.closeCartSheet();
  }

  removeFromCart(item: ItemRecord) {
    this.cartService.removeFromCart(item);
  }

  goToCart() {
    this.cartService.closeCartSheet();
    this.router.navigate(['/cart']);
  }
}
