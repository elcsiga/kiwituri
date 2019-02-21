import {Component, Input, OnInit} from '@angular/core';
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ConfigService} from "../../services/config.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() item: ItemRecord;

  constructor(
    private cartService: ShoppingCartService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
  }

  removeFromCart(item: ItemRecord) {
    this.cartService.removeFromCart(item);
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
