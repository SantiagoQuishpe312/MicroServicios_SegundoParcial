import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/http/user/user.service';
import { Users } from 'src/app/types/users.types';
import { Router } from '@angular/router';
@Component({
  selector: 'vex-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private userService: UsersService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAll();
  }
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  getAll() {
    this.userService.getAll().subscribe(data => {
      console.log('data: ' + JSON.stringify(data));
    });
  }
  
}
