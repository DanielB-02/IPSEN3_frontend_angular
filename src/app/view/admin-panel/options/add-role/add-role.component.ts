import { Component } from '@angular/core';
import {RoleService} from "../../../../services/role.service";
import {Role} from "../../../../model/role/role";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {NgForOf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RoleForm} from "../../../../model/api/role-form/role-form";

@Component({
  selector: 'app-add-role',
  standalone: true,
  templateUrl: './add-role.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent {
  roleName: string = '';
  roleName2: string = '';
  roleId: string = '';
  selectedPermissions: string[] = [];
  roles: Role[] = [];
  message: string = '';

  constructor(private roleService: RoleService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.roleService.readAll().subscribe(data => {
      this.roles = data;
      console.log(this.roles)
    })
  }

    onCheckboxChange(permission: string): void {
    // Handle checkbox changes to maintain the selected permissions
    const index = this.selectedPermissions.indexOf(permission);

    if (index === -1) {
      // Permission not found in the array, add it
      this.selectedPermissions.push(permission);
    } else {
      // Permission found in the array, remove it
      this.selectedPermissions.splice(index, 1);
    }
  }


  createRole(): void {
    // Create a Role object with the entered name and selected permissions
    const newRole: RoleForm = {
      name: this.roleName,
      permissions: this.selectedPermissions
    };

    // Call the create method in RoleService
    this.roleService.create(newRole).subscribe(
        () => {
          this.message = 'Role created successfully';
          this.snackBar.open(this.message, 'Close', { duration: 3000 });
        },
        (error) => {
          console.error('Error creating role:', error);
          this.message = 'Error creating role';
          this.snackBar.open(this.message, 'Close', { duration: 3000 });
        }
    );
  }

  updateRole(): void {
    // Create a Role object with the entered name and selected permissions
    const newRole: RoleForm = {
      name: this.roleName,
      permissions: this.selectedPermissions
    };

    // Call the create method in RoleService
    this.roleService.update(newRole, this.roleId).subscribe(
        () => {
          this.message = 'Role updated successfully';
          this.snackBar.open(this.message, 'Close', { duration: 3000 });
        },
        (error) => {
          console.error('Error updating role:', error);
          this.message = 'Error updating role';
          this.snackBar.open(this.message, 'Close', { duration: 3000 });
        }
    );
  }

}
