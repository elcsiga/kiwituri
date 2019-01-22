import {Component, Input, OnInit} from '@angular/core';
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {UserService} from "../../services/user.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import { CarouselImage, CarouselService } from "../../carousel/carousel.service";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input() item: ItemRecord;
  constructor(
    public userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private carouselService: CarouselService
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

  openCarousel() {
    const images: CarouselImage[] = [{
      url: this.item.data.thumbnail.url
    }];
    this.item.data.images.forEach(image => images.push ({url: image.url}));

    this.carouselService.open(images);
  }
}
