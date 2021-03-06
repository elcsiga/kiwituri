import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatMenuModule, MatBottomSheetModule, MatTableModule, MatTabsModule, MatProgressBarModule, MatDialogModule
} from "@angular/material";
import {AppRoutingModule} from './app-routing.module';
import {HomeViewComponent} from './views/home-view/home-view.component';
import {HttpClientModule} from "@angular/common/http";
import {UploadModule} from "./upload/upload.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormModule} from "./form/form.module";
import {AboutViewComponent} from './views/about-view/about-view.component';
import {ShopViewComponent} from './views/shop-view/shop-view.component';
import {ItemCardComponent} from './components/item-card/item-card.component';
import {ItemFormComponent} from './components/item-form/item-form.component';
import {ItemEditViewComponent} from './views/item-edit-view/item-edit-view.component';
import {ItemCreateViewComponent} from './views/item-create-view/item-create-view.component';
import {CartSheetComponent} from './components/cart-sheet/cart-sheet.component';
import {SearchSheetComponent} from './components/search-sheet/search-sheet.component';
import {ShoppingCartViewComponent} from './views/shopping-cart-view/shopping-cart-view.component';
import {CarouselModule} from "./carousel/carousel.module";
import {ItemGalleryComponent} from './components/item-gallery/item-gallery.component';
import {LoginViewComponent} from './views/login-view/login-view.component';
import {ConfigEditViewComponent} from './views/config-edit-view/config-edit-view.component';
import {ConfigListViewComponent} from './views/config-list-view/config-list-view.component';
import {ChangePasswordViewComponent} from './views/change-password-view/change-password-view.component';
import {NgxMdModule} from 'ngx-md';
import {KitAnimatedListModule} from "./grid/animated-list.module";
import {ItemInfoComponent} from './components/item-info/item-info.component';
import {OrderViewComponent} from './views/order-view/order.component';
import {ErrorViewComponent} from './views/error-view/error-view.component';
import { OrdersViewComponent } from './views/orders-view/orders-view.component';
import { ItemCreatedComponent } from './components/item-created/item-created.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    AboutViewComponent,
    ShopViewComponent,
    ItemCardComponent,
    ItemFormComponent,
    ItemEditViewComponent,
    ItemCreateViewComponent,
    CartSheetComponent,
    SearchSheetComponent,
    ShoppingCartViewComponent,
    ItemGalleryComponent,
    LoginViewComponent,
    ConfigEditViewComponent,
    ConfigListViewComponent,
    ChangePasswordViewComponent,
    ItemInfoComponent,
    OrderViewComponent,
    ErrorViewComponent,
    OrdersViewComponent,
    ItemCreatedComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    AppRoutingModule,
    UploadModule,
    FormModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatTableModule,
    MatTabsModule,
    MatProgressBarModule,
    MatDialogModule,
    CarouselModule,
    NgxMdModule.forRoot(),
    KitAnimatedListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CartSheetComponent,
    SearchSheetComponent,
    ItemCreatedComponent
  ]
})
export class AppModule {
}
