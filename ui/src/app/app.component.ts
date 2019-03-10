import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/internal/operators";
import {UserService} from "./services/user.service";
import {User} from "../../../server/src/common/interfaces/user";
import {HttpClient} from "@angular/common/http";
import { ConfigService } from "./services/config.service";
import {RouterUtilsService} from "./services/router-utils.service";
import {ProgressService} from "./services/progress.service";
import {ShoppingCartService} from "./services/shopping-cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showMainHeader = true;
  user$ = this.userService.user$;
  progress$ = this.progressService.progress$;

  constructor(
    public router: Router,
    private http: HttpClient,
    private userService: UserService,
    private configService: ConfigService,
    private routerUtilsService: RouterUtilsService,
    private progressService: ProgressService,
    private cartService: ShoppingCartService
  ) {
    this.routerUtilsService.init();
    this.router.events.pipe(filter(event => event instanceof NavigationStart))
      .subscribe(event => {
        this.showMainHeader = (event as NavigationStart).url === '/';
      });

    this.cartService.init();
  }

  ngOnInit() {
  }

  logout() {
    this.http.get<User>('/api/auth/logout')
      .subscribe(user => {
        this.userService.setUser(user);
        this.router.navigate(['/']);
      }, error => {
        console.error(error);
      })
  }
}
