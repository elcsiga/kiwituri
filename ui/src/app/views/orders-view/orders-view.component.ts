import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../services/item.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {CarouselPosition} from "../../components/item-card/item-card.component";

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
  ) { }

  orderMap$: Observable<Map<number,ItemRecord[]>> = this.itemService.item$.pipe(
    map( items => items.filter(item => !!item.order)),
    map( items => {
      const m = new Map<number,ItemRecord[]>();
      items.forEach(item => {
          if ( m.has(item.order.id) ) {
            m.get(item.order.id).push(item);
          } else {
            m.set(item.order.id, [item]);
          }
        }
      );
      return m;
    })
  );

  ngOnInit() {
  }

  openCarousel(pos: CarouselPosition) {
    this.router.navigate([pos.id, 'image', pos.index], {relativeTo: this.activatedRoute});
  }
}
