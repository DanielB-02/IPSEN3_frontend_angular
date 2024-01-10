import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';

import {UserStorageService} from "../../auth/user-storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-navigation-column',
  templateUrl: './navigation-column.component.html',
  styleUrl: './navigation-column.component.scss'
})
export class NavigationColumnComponent {
  isAdmin: boolean = false;
  isReadonly: boolean = false;
    constructor(
      private router: Router,
      private authService: AuthService,
      private userStorageService: UserStorageService
  ) {}
  ngOnInit(): void {
    this.isAdmin = this.userStorageService.isAdmin();
    this.isReadonly = this.userStorageService.isReadonly()
  }

  uitloggenClicked(): void {
    // alert('tets');
    this.router.navigateByUrl('/login');
    this.authService.logout()
  }
}
