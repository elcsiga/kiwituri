import {NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {HomeViewComponent} from "./views/home-view/home-view.component";
import {AboutViewComponent} from "./views/about-view/about-view.component";
import {ShopViewComponent} from "./views/shop-view/shop-view.component";
import {ItemEditViewComponent} from "./views/item-edit-view/item-edit-view.component";
import {ItemCreateViewComponent} from "./views/item-create-view/item-create-view.component";
import {ShoppingCartViewComponent} from "./views/shopping-cart-view/shopping-cart-view.component";
import {ItemGalleryComponent} from "./components/item-gallery/item-gallery.component";
import {LoginViewComponent} from "./views/login-view/login-view.component";
import {ConfigEditViewComponent} from "./views/config-edit-view/config-edit-view.component";
import {ConfigListViewComponent} from "./views/config-list-view/config-list-view.component";
import {ChangePasswordViewComponent} from "./views/change-password-view/change-password-view.component";

export class CustomReuseStrategy implements RouteReuseStrategy {

  constructor() {
  }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return null;
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    try{
      const a = future.component;
      const b = curr.component;
      return a && b && a === b;
    } catch (e) {
      return false;
    }
  }
}

const routes: Routes = [
  {path: '', component: HomeViewComponent, pathMatch: 'full'},
  {path: 'shop/:category', component: ShopViewComponent},
  {path: 'shop', component: ShopViewComponent, children: [
      {path: ':id/image/:index',  component: ItemGalleryComponent}
    ]},
  {path: 'about', component: AboutViewComponent},
  {path: 'edit/:id', component: ItemEditViewComponent},
  {path: 'create', component: ItemCreateViewComponent},
  {path: 'cart', component: ShoppingCartViewComponent},
  {path: 'login', component: LoginViewComponent},
  {path: 'change-password', component: ChangePasswordViewComponent},
  {path: 'config', component: ConfigListViewComponent},
  {path: 'config/:key', component: ConfigEditViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ]
})
export class AppRoutingModule {
}
