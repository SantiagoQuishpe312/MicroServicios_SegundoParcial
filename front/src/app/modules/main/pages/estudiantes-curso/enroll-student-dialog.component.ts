import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UsersService } from 'src/app/core/http/user/user.service';
import { Users } from 'src/app/types/users.types';

@Component({
  selector: 'app-enroll-student-dialog',
  templateUrl: './enroll-student-dialog.component.html',
  styleUrls: ['./enroll-student-dialog.component.scss']
})
export class EnrollStudentDialogComponent implements OnInit {
  allUsers: Users[] = [];
  filteredUsers: Observable<Users[]>;
  userControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<EnrollStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { enrolledUsers: Users[] },
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.allUsers = users.filter(user => !this.data.enrolledUsers.some(enrolled => enrolled.id === user.id));

      this.filteredUsers = this.userControl.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.nombre)),
        map(name => name ? this.filterUsers(name) : this.allUsers.slice())
      );
    });
  }

  private filterUsers(name: string): Users[] {
    const filterValue = name.toLowerCase();
    return this.allUsers.filter(user => user.nombre.toLowerCase().includes(filterValue));
  }

  displayFn(user: Users): string {
    return user && user.nombre ? user.nombre : '';
  }

  enroll(): void {
    const selectedUser = this.userControl.value;
    if (selectedUser) {
      this.dialogRef.close(selectedUser);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
