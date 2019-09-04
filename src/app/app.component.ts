import { Component } from '@angular/core';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { USERS } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private dataService: DataService, private authService: AuthService) {
    if (localStorage.getItem('currentUser')) {
      this.dataService.currentUser = DataService.getCurrentUser();
    } else {
      DataService.setCurrentUserInStorage(USERS[0]);
      this.dataService.currentUser = DataService.getCurrentUser();
    }
    if (localStorage.getItem('users')) {
      this.dataService.users = DataService.getUsers();
    } else {
      DataService.setUsersInStorage(this.dataService.users);
    }

    this.authService.userStatus$.subscribe(status => {
      if (status) {
        this.dataService.currentUser = this.dataService.users
          .filter(user => user.status === status)[0];
      }
      DataService.setCurrentUserInStorage(this.dataService.currentUser);

    });
  }
}
