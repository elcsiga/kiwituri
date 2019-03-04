import {Component, ViewChild} from '@angular/core';
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {combineLatest, Observable} from "rxjs";
import {UserService} from "../../services/user.service";
import {SearchService} from "../../services/search.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ItemService} from "../../services/item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CarouselPosition} from "../../components/item-card/item-card.component";
import {ConfigService} from "../../services/config.service";
import {map, tap} from "rxjs/operators";
import {animate, style, transition, trigger} from "@angular/animations";
import {ProgressService} from "../../services/progress.service";

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0'}),
        animate('.3s ease-out', style({opacity: '1'})),
      ]),
      transition(':leave', [
        style({opacity: '1'}),
        animate('.3s ease-out', style({opacity: '0'})),
      ]),
    ]),
  ],
})
export class ShopViewComponent {


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

  activeCategory$: Observable<string> = this.activatedRoute.params.pipe(
    map(params => params['category'] ? params['category'] : '')
  );

  search$ = this.searchService.search$;

  reportProgress(p: number | null) {
    this.progressService.set(p);
  }

  items$: Observable<ItemRecord[]> = combineLatest([
    this.itemService.item$,
    this.activeCategory$,
    this.search$
  ]).pipe(
    map(([items, category, search]) => {
      return (category ? items.filter(item => item.data.category === category) : items)
        .filter(item => search.sex === 'ALL' || search.sex === item.data.sex || item.data.sex === 'ALL')
        .filter(item => search.size === 'ALL' || search.size === item.data.size);
    })
  );

  categories$: Observable<{ key: string, value: string }[]> = combineLatest([
    this.itemService.item$,
    this.configService.settings$
  ]).pipe(
    map(([items, settings]) => Object.keys(settings.CATEGORIES)
      .filter(key => items.find(item => item.data.category === key))
      .map(key => ({key, value: settings.CATEGORIES[key]}))
    )
  );

  openCartSheet() {
    this.cartService.openCartSheet();
  }

  openSearchSheet() {
    this.searchService.openCartSheet();
  }

  isAdmin() {
    return this.userService.isAdmin();
  }

  openCarousel(pos: CarouselPosition) {
    this.router.navigate([ pos.id, 'image', pos.index], {relativeTo: this.activatedRoute});
  }

  isFiltering() {
    return this.searchService.isFiltering()
  }
}
