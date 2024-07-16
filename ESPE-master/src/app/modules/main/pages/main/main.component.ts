import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
@Component({
  selector: 'vex-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.mainService.listar().subscribe(data => {
      console.log('data: ' + JSON.stringify(data));
    });
  }
  
}
