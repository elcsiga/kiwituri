import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../services/item.service";
import {UserService} from "../../services/user.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {SearchService} from "../../services/search.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../services/config.service";
import {ProgressService} from "../../services/progress.service";
import {combineLatest, Observable} from "rxjs";
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  items$: Observable<ItemRecord[]> = combineLatest([
    this.itemService.item$,
  ]).pipe(
    map(([items]) => {
      return items.filter(item => !!item.data.order);
    })
  );

  constructor(
    private itemService: ItemService,
    private userService: UserService,
    private cartService: ShoppingCartService,
    private searchService: SearchService,
    private router: Router,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private progressService: ProgressService
  ) {
  }

  ngOnInit() {
  }



}
