import { Component, OnInit } from '@angular/core';
import {CarouselPosition} from "../../components/item-card/item-card.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../services/item.service";
import {UserService} from "../../services/user.service";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-order-view',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderViewComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private userService: UserService,
    private configService: ConfigService
  ) { }

  postBuyText$ = this.configService.getText('postbuy');

  orderId$: Observable<number> = this.activatedRoute.params.pipe(
    map(params => params['orderId'] ? +params['orderId'] : -1)
  );

  orderedItems$: Observable<ItemRecord[]> = combineLatest([
    this.itemService.item$,
    this.orderId$
  ]).pipe(
    map(([items, orderId]) => items.filter(item => item.order && item.order.id === orderId))
  );

  ngOnInit() {
  }

  openCarousel(pos: CarouselPosition) {
    this.router.navigate([pos.id, 'image', pos.index], {relativeTo: this.activatedRoute});
  }
}

