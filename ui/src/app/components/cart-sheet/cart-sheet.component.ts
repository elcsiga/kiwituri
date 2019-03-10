import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material";
import {CartSheetData} from "../../services/shopping-cart.service";
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

  constructor(
    private router: Router,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: CartSheetData
  ) {
    this.cartItems$ = this.data.service.cartItems$;
  }

  ngOnInit() {
  }

  close() {
    this.data.service.closeCartSheet();
  }

  removeFromCart(item: ItemRecord) {
    this.data.service.removeFromCart(item);
  }

  goToCart() {
    this.data.service.closeCartSheet();
    this.router.navigate(['/cart']);
  }
}
