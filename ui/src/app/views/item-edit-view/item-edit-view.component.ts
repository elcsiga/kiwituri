import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {NotificationService} from "../../services/notification.service";
import {ItemBody, ItemRecord} from "../../../../../server/src/common/interfaces/item";

@Component({
  selector: 'app-item-edit-view',
  templateUrl: './item-edit-view.component.html',
  styleUrls: ['./item-edit-view.component.css']
})
export class ItemEditViewComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {
  }

  id$: Observable<number> = this.activatedRoute.paramMap.pipe(map(paramMap => +paramMap.get('id')));

  item$: Observable<ItemBody> = this.id$.pipe(
    switchMap(id => this.http.get<ItemRecord>('/api/items/' + id)),
    map( record => record.data)
  );


  onSubmit(item: ItemBody) {

    const id: number = +this.activatedRoute.snapshot.paramMap.get('id');
    this.http.put<ItemRecord>('/api/items/'+id, item)
      .subscribe(response => {
        console.log(response);
        this.notificationService.info('Sikeresen elmentve: #' + response.id);
        this.router.navigate(['/shop']);
      }, error => {
        this.notificationService.info('Nem sikerült a mentés');
        console.error(error);
      })
  }
}
