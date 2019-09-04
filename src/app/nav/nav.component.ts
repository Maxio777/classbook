import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { STATUSES } from '../constants';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { User } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  statuses = STATUSES;
  currentUser: User = this.dataService.currentUser;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private dataService: DataService,
              private router: Router) {}

  changeStatus(status) {
    this.authService.changeUserStatus(status);
  }

  goTo(direct) {
    this.router.navigate([direct]);
  }
}
