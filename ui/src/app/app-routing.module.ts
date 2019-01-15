import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeViewComponent} from "./views/home-view/home-view.component";
import {AboutViewComponent} from "./views/about-view/about-view.component";
import {ShopViewComponent} from "./views/shop-view/shop-view.component";
import {ItemEditViewComponent} from "./views/item-edit-view/item-edit-view.component";
import {ItemCreateViewComponent} from "./views/item-create-view/item-create-view.component";

const routes: Routes = [
  {path: '', component: HomeViewComponent, pathMatch: 'full'},
  {path: 'shop', component: ShopViewComponent},
  {path: 'about', component: AboutViewComponent},
  {path: 'edit/:id', component: ItemEditViewComponent},
  {path: 'create', component: ItemCreateViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
