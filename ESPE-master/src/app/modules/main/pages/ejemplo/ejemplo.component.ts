import { Component, OnInit } from '@angular/core';
import {ExampleService } from '../../../../core/http/example/example.service';
import { Example} from '../../../../types/example.types'
@Component({
  selector: 'vex-ejemplo',
  templateUrl: './ejemplo.component.html',
  styleUrls: ['./ejemplo.component.scss']
})
export class EjemploComponent implements OnInit {

  arreglo: Example[];
  constructor(private exampleService: ExampleService) { }

  ngOnInit(): void {
    this.getExample();
  }

  getExample(){
    this.exampleService.getAll().subscribe(examples => {
      this.arreglo = examples;
    });
  }

}
