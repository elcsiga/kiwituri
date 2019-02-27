import {Component} from '@angular/core';
import {ItemService} from "../../services/item.service";
import {filter, map} from "rxjs/operators";
import {combineLatest, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CarouselImage} from "../../carousel/components/carousel/carousel.component";
import {RouterUtilsService} from "../../services/router-utils.service";

@Component({
  selector: 'app-item-gallery',
  templateUrl: './item-gallery.component.html',
  styleUrls: ['./item-gallery.component.css']
})
export class ItemGalleryComponent {

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private routerUtilsService: RouterUtilsService,
  ) {
  }

  images$: Observable<CarouselImage[]> = combineLatest(
    this.itemService.item$,
    this.activatedRoute.paramMap
  ).pipe(
    map(([items, paramMap]) => items.find(
      i => i.id === +paramMap.get('id')
    )),
    filter( item => item !== undefined),
    map( item => {
      const images: CarouselImage[] = [{
        url: item.data.thumbnail.normal.url
      }];
      item.data.images.forEach(image => images.push ({url: image.normal.url}));
      return images;
    })
  );

  index$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => +paramMap.get('index'))
  );

  close() {
    const baseUrl = this.router.url.replace('/' + this.activatedRoute.snapshot.url.join('/'), '');
    this.routerUtilsService.goBack(baseUrl === this.router.url ? '/shop' : baseUrl);
  }

}
