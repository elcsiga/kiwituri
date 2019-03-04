import { Component, OnInit } from '@angular/core';
import {CarouselPosition} from "../../components/item-card/item-card.component";
import {ActivatedRoute, Router} from "@angular/router";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ItemService} from "../../services/item.service";
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {UserService} from "../../services/user.service";
import {User} from "../../../../../server/src/common/interfaces/user";

@Component({
  selector: 'app-my-items-view',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsViewComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private userService: UserService
  ) { }

  email$: Observable<string> = combineLatest([
    this.userService.user$,
    this.activatedRoute.params
  ]).pipe(
    map(([user, params]) => params['email'] ? params['email'] : user ? user.email.email : 'N/A')
  );

  myItems$: Observable<ItemRecord[]> = combineLatest([
    this.itemService.item$,
    this.email$,
  ]).pipe(
    map(([items, email]) => {
      return items.filter(item => item.data.store === email);
    })
  );

  ngOnInit() {
  }

  openCarousel(pos: CarouselPosition) {
    this.router.navigate([pos.id, 'image', pos.index], {relativeTo: this.activatedRoute});
  }
}
