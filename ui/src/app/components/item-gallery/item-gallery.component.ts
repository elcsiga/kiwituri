import {Component} from '@angular/core';
import {ItemService} from "../../services/item.service";
import {filter, map} from "rxjs/operators";
import {combineLatest, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CarouselImage} from "../../carousel/components/carousel/carousel.component";
import {Location} from '@angular/common';

@Component({
  selector: 'app-item-gallery',
  templateUrl: './item-gallery.component.html',
  styleUrls: ['./item-gallery.component.css']
})
export class ItemGalleryComponent {

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private location: Location
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
        url: item.data.thumbnail.url
      }];
      item.data.images.forEach(image => images.push ({url: image.url}));
      return images;
    })
  );

  index$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => +paramMap.get('index'))
  );

  close() {
    this.location.back();
  }

}
