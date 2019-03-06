import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../../../../server/src/common/interfaces/user";
import {HttpClient} from "@angular/common/http";
import {Store, StoreCollection} from "../util/Store";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: Store<User> = new Store<User>(null);
  user$ = this.user.value$;

  private users: StoreCollection<User> = new StoreCollection<User>([]);
  users$ = this.users.value$;

  isAdmin(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }

  constructor(
    private http: HttpClient
  ) {
    this.http.get<User>('/api/auth/me')
      .subscribe(user => {
        this.setUser(user);
      }, error => {
        console.error(error);
      });

  }

  setUser(user: User) {
    this.user.set(user);

    this.http.get<User[]>('/api/user')
      .subscribe(users => {
        this.users.set(users);
      }, error => {
        this.users.set([]);
        console.error(error);
      });
  }
}
