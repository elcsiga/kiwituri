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
  MatMenuModule, MatBottomSheetModule, MatTableModule
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
import { NgMasonryGridModule } from "ng-masonry-grid";
import { CartSheetComponent } from './components/cart-sheet/cart-sheet.component';
import { SearchSheetComponent } from './components/search-sheet/search-sheet.component';
import { ShoppingCartViewComponent } from './views/shopping-cart-view/shopping-cart-view.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CarouselModule } from "./carousel/carousel.module";

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
    CartItemComponent
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
    NgMasonryGridModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatTableModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CartSheetComponent,
    SearchSheetComponent
  ]
})
export class AppModule {
}
