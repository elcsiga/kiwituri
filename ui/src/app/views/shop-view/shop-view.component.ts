import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";
import {SearchService} from "../../services/search.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ItemService} from "../../services/item.service";
import {Router} from "@angular/router";
import {CarouselPosition} from "../../components/item-card/item-card.component";

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css']
})
export class ShopViewComponent implements OnInit {

  constructor(
    private itemService: ItemService,
    private userService: UserService,
    private cartService: ShoppingCartService,
    private searchService: SearchService,
    private router: Router
  ) { }

  items$: Observable<ItemRecord[]> = this.itemService.item$;

  ngOnInit() {
  }

  openCartSheet() {
    this.cartService.openCartSheet();
  }

  openSearchSeet() {
    this.searchService.openCartSheet();
  }

  isAdmin() {
    return this.userService.isAdmin();
  }

  openCarousel(pos: CarouselPosition) {
    this.router.navigate(['/','shop', pos.id,'image', pos.index]);
  }
}
