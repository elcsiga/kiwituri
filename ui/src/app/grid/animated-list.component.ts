import {
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {debounceTime} from 'rxjs/operators';
import * as imagesLoaded from 'imagesLoaded';

interface ArrangedItem {
  x: number;
  y: number;
  h: number;
  w: number,
  item: any;
}

@Component({
  selector: 'animated-list',
  templateUrl: './animated-list.component.html',
  styleUrls: ['./animated-list.component.scss'],
  animations: [
    trigger('flyInOut', [

      transition('void => *', [
        query('.transformer', [
          style({
            transform: 'scale(.5,.5)',
            opacity: 0
          }),
          animate(300)
        ])
      ]),
      transition('* => void', [
        query('.transformer', [
          animate(300, style({
            transform: 'scale(.5,.5)',
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class AnimatedListComponent implements OnInit, OnChanges {

  @Input() items: any[];
  @Input() itemTemplate: ElementRef;
  @Input() columnWidth: number = 200;
  @Input() fluidMaxWidth: number = 600;
  @Input() gutter: number = 10;
  @Output() progress = new EventEmitter<number | null>();

  public realColumnWidth;

  private version = 0;

  measuredItems: ArrangedItem[];
  private itemHeights: number[];
  arrangedItems: ArrangedItem[];
  containerHeight: number;

  private sub: Subscription;

  constructor() {
  }

  @ViewChild('container') container: ElementRef;
  @ViewChildren('itemContainer') itemContainers: QueryList<any>;
  @ViewChildren('ghostItem') ghostItems: QueryList<any>;

  ngOnInit() {
    const resize$ = fromEvent(window, 'resize')
      .pipe(debounceTime(300));

    this.sub = resize$.subscribe(() => {
      this.arrange(this.version);
    });

    this.update();
  }

  ngOnChanges(): void {
    this.update();
  }

  update() {
    this.version ++;
    this.arrangedItems = [];
    this.itemHeights = [];

    this.checkFroItems(this.version);
  }


  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  trackByMeasuredItemId(index: number, item: any) {
    return item.id;
  }

  trackByArrangedItemId(index: number, arrangedItem: ArrangedItem) {
    return arrangedItem.item.id;
  }

  checkFroItems(version) {

    const containerWidth = this.container.nativeElement.clientWidth;
    this.realColumnWidth = (containerWidth < this.fluidMaxWidth) ? (containerWidth - this.gutter) / 2 -.1 : this.columnWidth;

    const sectionCount = 1;
    if (this.items.length > this.itemHeights.length ) {

      this.measuredItems = this.items.slice(this.itemHeights.length, this.itemHeights.length + sectionCount);
      setTimeout(() => {
          imagesLoaded('.ghostItem', () => {
            if (version === this.version) {
              const itemHeights = this.ghostItems.toArray()
                .map(item => item.nativeElement.clientHeight);
              this.itemHeights = this.itemHeights.concat(itemHeights);
              this.arrange(version);
            }
          });
      }, 0);

    }
  }


  arrange(version) {
    if (version !== this.version) {
      return;
    }
    const containerWidth = this.container.nativeElement.clientWidth;
    const numOfColumns = Math.floor((containerWidth + this.gutter) / (this.realColumnWidth + this.gutter));
    const margin = (containerWidth - numOfColumns * this.realColumnWidth - this.gutter * (numOfColumns - 1)) / 2;
    const colTops = new Array(numOfColumns).fill(0);
    const arrangedItems = [];

    for (let i = 0; i < this.itemHeights.length; i++) {

      let colIndex = 0;
      let y = colTops[0];
      for (let c = 1; c < numOfColumns; c++) {
        if (colTops[c] < y) {
          y = colTops[c];
          colIndex = c;
        }
      }

      const x = margin + (this.realColumnWidth + this.gutter) * colIndex;
      const w = this.realColumnWidth;
      const h = this.itemHeights[i];
      const item = this.items[i];

      arrangedItems.push({x, y, w, h, item});

      colTops[colIndex] += h + this.gutter;

      this.containerHeight = Math.max(...colTops) - this.gutter;
    }
    this.arrangedItems = arrangedItems;
    this.checkFroItems(version);
  }
}



