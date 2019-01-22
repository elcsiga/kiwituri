import {Component} from '@angular/core';
import {ItemService} from "../../services/item.service";
import {map} from "rxjs/operators";
import {combineLatest, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ItemRecord} from "../../../../../server/src/common/interfaces/item";
import {CarouselImage} from "../../carousel/carousel.service";

@Component({
  selector: 'app-item-gallery',
  templateUrl: './item-gallery.component.html',
  styleUrls: ['./item-gallery.component.css']
})
export class ItemGalleryComponent {

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  images$: Observable<CarouselImage[]> = combineLatest(
    this.itemService.item$,
    this.activatedRoute.paramMap
  ).pipe(
    map(([items, paramMap]) => items.find(
      i => i.id === +paramMap.get('id')
    )),
    map( item => {
      const images: CarouselImage[] = [{
        url: item.data.thumbnail.url
      }];
      item.data.images.forEach(image => images.push ({url: image.url}));
      return images;
    })
  );

}
