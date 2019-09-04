import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userStatus = new BehaviorSubject<string>('');
  userStatus$ = this.userStatus.asObservable();

  changeUserStatus(status: string) {
    this.userStatus.next(status);
  }
}
