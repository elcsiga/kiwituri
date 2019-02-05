import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/internal/operators";
import {UserService} from "./services/user.service";
import {User} from "../../../server/src/common/interfaces/user";
import {HttpClient} from "@angular/common/http";
import { ConfigService } from "./services/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showMainHeader = true;
  user$ = this.userService.user$;

  constructor(
    public router: Router,
    private http: HttpClient,
    private userService: UserService,
    private configService: ConfigService
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationStart))
      .subscribe(event => {
        this.showMainHeader = (event as NavigationStart).url === '/';
      });
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
