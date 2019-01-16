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
  MatAutocompleteModule
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

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    AboutViewComponent,
    ShopViewComponent,
    ItemCardComponent,
    ItemFormComponent,
    ItemEditViewComponent,
    ItemCreateViewComponent
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
    NgMasonryGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
