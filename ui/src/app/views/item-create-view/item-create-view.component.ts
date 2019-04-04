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
import {filter, map, take} from "rxjs/operators";
import {User} from "../../../../../server/src/common/interfaces/user";
import {MatDialog} from "@angular/material";
import {ItemCreatedComponent} from "../../components/item-created/item-created.component";


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
    store: userId,
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
    private userService: UserService,
    private dialog: MatDialog
  ) {
  }

  onSubmit(item: ItemBody) {
    this.http.post<ItemRecord>('/api/items', item)
      .subscribe(createdItem => {
        this.itemService.add(createdItem);

        let storeUser: User;
        this.userService.users$.pipe( take(1) ).subscribe(
          users => storeUser = users.find( u => u.email === createdItem.data.store)
        );
        const code = (storeUser ? storeUser.initial : '?' ) + createdItem.id;

        const dialogRef = this.dialog.open(ItemCreatedComponent, {
            width: '250px',
            data: {item:createdItem, code: code}
          });

        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['/shop']);
        });

      }, error => {
        this.notificationService.info('Nem sikerült a mentés');
        console.error(error);
      })
  }
}
