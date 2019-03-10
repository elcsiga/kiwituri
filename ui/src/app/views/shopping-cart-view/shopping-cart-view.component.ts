import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BuyData, ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {ActivatedRoute, Router} from "@angular/router";
import {CarouselPosition} from "../../components/item-card/item-card.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "../../services/notification.service";
import {ConfigService} from "../../services/config.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-shopping-cart-view',
  templateUrl: './shopping-cart-view.component.html',
  styleUrls: ['./shopping-cart-view.component.css']
})
export class ShoppingCartViewComponent implements OnInit {

  cartItems$: Observable<ItemRecord[]> = this.cartService.cartItems$;

  buyForm: FormGroup;
  preBuyText$ = this.configService.getText('prebuy');

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cartService: ShoppingCartService,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private configService: ConfigService
  ) {

  }

  ngOnInit() {
    this.buyForm = this.fb.group({
      email: ['', [Validators.required]],
    });

  }

  removeFromCart(item: ItemRecord) {
    this.cartService.removeFromCart(item);
  }


  openCarousel(pos: CarouselPosition) {
    this.router.navigate([pos.id, 'image', pos.index], {relativeTo: this.activatedRoute});
  }

  onSubmit() {
    if (this.buyForm.valid) {
      const buyData: BuyData = {
        email: this.buyForm.value['email'],
        itemIds: this.cartService.getCartSnapshot()
      };

      this.http.post<any>('/api/items/buy', buyData)
        .subscribe(({orderId, items}) => {
          console.log('SUCCESFUL ORDER: ', orderId);
          items.forEach(item => {
            this.itemService.update(item);
            this.cartService.removeFromCart(item);
          });

          this.router.navigate(['/order', orderId]);
        }, error => {
          this.notificationService.error('Nem sikerült a rendelés!');
          console.error(error);
        })
    } else {
      console.error('Trying to submit an invalid form...');
    }
  }
}
