import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../services/item.service";
import {Observable, combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {CarouselPosition} from "../../components/item-card/item-card.component";
import {ItemOrder, ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {UserService} from "../../services/user.service";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.css']
})
export class OrdersViewComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private userService: UserService
  ) {
  }


  orderMap$: Observable<Map<number, Map<string, ItemRecord[]>>> = combineLatest([
    this.itemService.item$,
    this.userService.users$
  ]).pipe(map(([items, users]) => {

    const orderMap = new Map<number, Map<string, ItemRecord[]>>();
    items
      .filter(item => !!item.order)
      .forEach(item => {
        let order: Map<string, ItemRecord[]>;
        if (orderMap.has(item.order.id)) {
          order = orderMap.get(item.order.id);
        } else {
          order = new Map<string, ItemRecord[]>();
          orderMap.set(item.order.id, order);
        }

        let items: ItemRecord[];
        const user = users.find( u => u.email === item.data.store);
        if (order.has(user)) {
          items = order.get(user);
        } else {
          items = [];
          order.set(user, items);
        }

        items.push(item);
      });
    return orderMap;

  }));

  ngOnInit() {
  }

  getOrderInfo(order: Map<string, ItemRecord[]>): ItemOrder {
    return order.values().next().value[0].order;
  }

  openCarousel(pos: CarouselPosition) {
    this.router.navigate([pos.id, 'image', pos.index], {relativeTo: this.activatedRoute});
  }

  orderedByDate = (a: KeyValue<number,Map<string, ItemRecord[]>>, b: KeyValue<number,Map<string, ItemRecord[]>>): number => {
    return this.getOrderInfo(b.value).date - this.getOrderInfo(a.value).date;
  }
}
