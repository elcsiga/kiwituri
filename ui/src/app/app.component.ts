import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from "@angular/router";
import { filter } from "rxjs/internal/operators";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showMainHeader = true;

  constructor(
    public router: Router,
    private userService: UserService
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationStart))
      .subscribe( event => {
          this.showMainHeader = (event as NavigationStart).url === '/';
      });

  }

  toggleEditMode() {
    this.userService.toggleEditMode();
  }
  ngOnInit() {
  }
}
