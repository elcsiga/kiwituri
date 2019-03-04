import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {
  ItemBody,
  ItemRecord,
  ItemStatus,
  TimeStampData,
  UserId
} from "../../../../../server/src/common/interfaces/item";
import {ItemService} from "../../services/item.service";
import {UserService} from "../../services/user.service";
import {filter, map} from "rxjs/operators";
import {User} from "../../../../../server/src/common/interfaces/user";


@Component({
  selector: 'app-item-create-view',
  templateUrl: './item-create-view.component.html',
  styleUrls: ['./item-create-view.component.css']
})
export class ItemCreateViewComponent {

  getEmptyItem = (userId: UserId): ItemBody => ({
    thumbnail: null,
    images: [],
    category: null,
    tags: [],
    sex: null,
    size: null,
    sizeEstimated: false,
    description: '',
    status: 'STATUS2_ACTIVE',
    store: userId,
    orderId: 0,
    contactEmail: ''
  });

  emptyItem$ = this.userService.user$.pipe(
    filter( user => !!user),
    map( user => this.getEmptyItem(user.email))
  );

  constructor(
    private http: HttpClient,
    private itemService: ItemService,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService
  ) {
  }

  onSubmit(item: ItemBody) {
    this.http.post<ItemRecord>('/api/items', item)
      .subscribe(createdItem => {
        this.notificationService.info('Sikeresen elmentve: #' + createdItem.id);
        this.itemService.add(createdItem);
        this.router.navigate(['/shop']);
      }, error => {
        this.notificationService.info('Nem sikerült a mentés');
        console.error(error);
      })
  }
}
