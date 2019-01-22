import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {UserService} from "../../services/user.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input() item: ItemRecord;
  @Output() openCarousel = new EventEmitter<number>();
  constructor(
    public userService: UserService,
    private shoppingCartService: ShoppingCartService,
  ) { }

  ngOnInit() {
  }

  isInCart() {
    return this.shoppingCartService.isInCart(this.item);

  }
  addToCart() {
    this.shoppingCartService.addToCart(this.item);
    this.shoppingCartService.openCartSheet();
  }
}
