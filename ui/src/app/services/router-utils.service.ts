import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RouterUtilsService {

  historyLength = 0;

  constructor(
    private location: Location,
    private router: Router
  ) {
  }

  init() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        this.historyLength ++;
      });
  }
  goBack(fallbackUrl: string) {
    if (this.historyLength > 1) { //previous page was also here
      this.location.back();
    } else {
      this.router.navigateByUrl(fallbackUrl || '/');
    }
  }
}
