import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {ItemBody, ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {ItemService} from "../../services/item.service";


@Component({
  selector: 'app-item-create-view',
  templateUrl: './item-create-view.component.html',
  styleUrls: ['./item-create-view.component.css']
})
export class ItemCreateViewComponent {

  emptyItem: ItemBody = {
    thumbnail: null,
    images: [],
    category: null,
    tags: [],
    sex: null,
    size: null,
    sizeEstimated: false,
    description: ''
  };

  constructor(
    private http: HttpClient,
    private itemService: ItemService,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  onSubmit(item: ItemBody) {
    this.http.post<ItemRecord>('/api/items', item)
      .subscribe( createdItem => {
        this.notificationService.info('Sikeresen elmentve: #'+createdItem.id);
        this.itemService.add(createdItem);
        this.router.navigate(['/shop']);
      }, error => {
        this.notificationService.info('Nem sikerült a mentés');
        console.error(error);
      })
  }
}
