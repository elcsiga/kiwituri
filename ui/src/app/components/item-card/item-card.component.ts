import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemRecord, ItemStatus} from "../../../../../server/src/common/interfaces/item";
import {UserService} from "../../services/user.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ItemService} from "../../services/item.service";
import {NotificationService} from "../../services/notification.service";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../services/config.service";
import {allowChangeStatus} from "../../../../../server/src/common/validators/status";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export interface CarouselPosition {
  id: number,
  index: number
}

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input() item: ItemRecord;
  @Output() openCarousel = new EventEmitter<CarouselPosition>();
  @Input() action: string;
  @Input() horizontal = false;

  setting$ = this.configService.settings$;
  user$ = this.userService.user$;
  users$ = this.userService.users$;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private configService: ConfigService,
    private itemService: ItemService,
    private notificationService: NotificationService,
    private shoppingCartService: ShoppingCartService,
    private cartService: ShoppingCartService
  ) {
  }

  ngOnInit() {
  }

  getBackgroundColor() {
    switch (this.item.status as ItemStatus) {
      case 'STATUS1_HIDDEN' :
        return '#ccc';
      case 'STATUS3_ORDERED' :
        return '#fcc';
      case 'STATUS4_SHIPPED' :
        return '#cfc';
      case 'STATUS5_SOLD' :
        return '#ccf';
      case 'STATUS6_LOST' :
        return '#cff';

      case 'STATUS2_ACTIVE':
      default:
        return '#fff';
    }
  }

  isInCart() {
    return this.shoppingCartService.isInCart(this.item);
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.item);
    this.shoppingCartService.openCartSheet();
  }

  deleteItem() {
    if (confirm('Biztosan törlöd ezt? #' + this.item.id)) {
      this.http.delete<ItemRecord>('/api/items/' + this.item.id)
        .subscribe(deletedItem => {
          this.notificationService.info('Sikeresen törölve: #' + deletedItem.id);
          this.itemService.remove(deletedItem);
        }, error => {
          this.notificationService.info('Nem sikerült a törlés');
          console.error(error);
        })
    }
  }

  changeStatus(status: ItemStatus) {
    this.http.put<ItemRecord>('/api/items/' + this.item.id + '/status/' + status, {})
      .subscribe(changedItem => {
        this.notificationService.info('Sikeres állapotváltoztatás: #' + changedItem.id);
        this.itemService.update(changedItem);
      }, error => {
        this.notificationService.info('Nem sikerült az állapotot megváltoztatni');
        console.error(error);
      })

  }

  removeFromCart() {
    this.cartService.removeFromCart(this.item);
  }

  isDisabled(status: ItemStatus) {
    return !allowChangeStatus(this.item, status);
  }

  getStoreUserInitial$(): Observable<string> {
    return this.users$.pipe(
      map(users => users.find(u => u.email === this.item.data.store)),
      map( user => user ? user.initial : '-')
    )
  }
}
