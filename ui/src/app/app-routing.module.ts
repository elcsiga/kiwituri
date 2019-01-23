import {NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {HomeViewComponent} from "./views/home-view/home-view.component";
import {AboutViewComponent} from "./views/about-view/about-view.component";
import {ShopViewComponent} from "./views/shop-view/shop-view.component";
import {ItemEditViewComponent} from "./views/item-edit-view/item-edit-view.component";
import {ItemCreateViewComponent} from "./views/item-create-view/item-create-view.component";
import {ShoppingCartViewComponent} from "./views/shopping-cart-view/shopping-cart-view.component";
import {ItemGalleryComponent} from "./components/item-gallery/item-gallery.component";

export class CustomReuseStrategy implements RouteReuseStrategy {

  private handlers: {[key: string]: DetachedRouteHandle} = {};
  constructor() {
  }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false; //true;
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    //this.handlers[route.routeConfig.path] = handle;
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false; //!!route.routeConfig && !!this.handlers[route.routeConfig.path];
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return null;
    //if (!route.routeConfig) return null;
    //return this.handlers[route.routeConfig.path];
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    try{
      const a = future.pathFromRoot[0].firstChild.routeConfig.component.name;
      const b = curr.pathFromRoot[0].firstChild.routeConfig.component.name;
      return a === b;
    } catch (e) {
      return false;
    }
  }
}

const routes: Routes = [
  {path: '', component: HomeViewComponent, pathMatch: 'full'},
  {path: 'shop', component: ShopViewComponent},
  {path: 'shop', component: ShopViewComponent, children: [
      {path: ':id/image/:index',  component: ItemGalleryComponent}
    ]},
  {path: 'about', component: AboutViewComponent},
  {path: 'edit/:id', component: ItemEditViewComponent},
  {path: 'create', component: ItemCreateViewComponent},
  {path: 'cart', component: ShoppingCartViewComponent}
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
