import {Component, Input, OnInit} from '@angular/core';
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() item: ItemRecord;

  constructor(
    private  cartService: ShoppingCartService
  ) { }

  ngOnInit() {
  }

  removeFromCart(item: ItemRecord) {
    this.cartService.removeFromCart(item);
  }
}
