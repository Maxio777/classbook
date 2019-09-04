import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  users: User[] = [];
  statusUser: string;
  subscribe;

  constructor(private authService: AuthService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.subscribe = this.authService.userStatus$.subscribe(status => {
      this.statusUser = status;
      if (this.statusUser === 'admin' || this.statusUser === '') {
        return true;
      } else {
        this.router.navigate(['/']);
      }
    });
    this.users = DataService.getUsers();
  }

  refreshData() {
    this.dataService.users = this.users;
    DataService.setUsersInStorage(this.users);
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
