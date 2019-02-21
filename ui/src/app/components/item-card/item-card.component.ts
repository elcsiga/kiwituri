import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemBody, ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {UserService} from "../../services/user.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ItemService} from "../../services/item.service";
import {NotificationService} from "../../services/notification.service";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../services/config.service";
import {Observable} from "rxjs";

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

  constructor(
    public userService: UserService,
    private http: HttpClient,
    private configService: ConfigService,
    private itemService: ItemService,
    private notificationService: NotificationService,
    private shoppingCartService: ShoppingCartService,
  ) {
  }

  ngOnInit() {
  }

  isInCart() {
    return this.shoppingCartService.isInCart(this.item);
  }

  getCategory(): Observable<string> {
    return this.configService.getCategory(this.item.data.category);
  }
  getSize(): Observable<string> {
    return this.configService.getSize(this.item.data.size);
  }
  getSex(): Observable<string> {
    return this.configService.getSex(this.item.data.sex);
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.item);
    this.shoppingCartService.openCartSheet();
  }

  deleteItem() {
    if (confirm('Boztosan törlöd ezt? #'+ this.item.id )) {
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

}
