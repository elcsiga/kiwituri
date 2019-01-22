import { Injectable } from '@angular/core';
import { StoreCollection } from "../util/Store";


export interface CarouselImage{
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private images = new StoreCollection<CarouselImage>([]);
  images$ = this.images.value$;

  constructor() { }

  open(images: CarouselImage[]) {
    this.images.set(images);
  }

  close() {
    this.images.clear();
  }
}
