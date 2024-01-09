import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  constructor(private router: Router) {}

  navigateToAdminPanel() {
    this.router.navigate(['/dashboard']);
}
  navigateToSignUp() {
    this.router.navigate(['/main-view/sign-up']);
  }
  navigateTodeleteUSer() {
    this.router.navigate(['/main-view/delete-user']);
  }
}
