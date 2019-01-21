import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

export interface User {
  admin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: BehaviorSubject<User> = new BehaviorSubject<User>({
    admin: false
  });
  user$ = this.user.asObservable();

  isAdmin(): Observable<boolean> {
    return this.user$.pipe(map(user => user.admin));
  }

  constructor() { }

  toggleEditMode() {
    this.user.next({admin: !this.user.value.admin});
  }
}
