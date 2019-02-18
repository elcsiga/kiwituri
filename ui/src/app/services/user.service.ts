import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../../../../server/src/common/interfaces/user";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  user$ = this.user.asObservable();

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
      })
  }

  setUser(user: User) {
    this.user.next(user);
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>('/api/user');
  }
}
