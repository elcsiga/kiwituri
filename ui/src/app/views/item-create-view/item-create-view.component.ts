import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {ItemBody, ItemRecord} from "../../../../../server/src/common/interfaces/item";


@Component({
  selector: 'app-item-create-view',
  templateUrl: './item-create-view.component.html',
  styleUrls: ['./item-create-view.component.css']
})
export class ItemCreateViewComponent {

  emptyItem: ItemBody = {
    thumbnail: null,
    images: [],
    tags: [],
    sex: null,
    size: null,
    sizeEstimated: false,
    description: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  onSubmit(item: ItemBody) {
    this.http.post<ItemRecord>('/api/items', item)
      .subscribe( response => {
        console.log(response);
        this.notificationService.info('Sikeresen elmentve: #'+response.id);
        this.router.navigate(['/shop']);
      }, error => {
        this.notificationService.info('Nem sikerült a mentés');
        console.error(error);
      })
  }
}
