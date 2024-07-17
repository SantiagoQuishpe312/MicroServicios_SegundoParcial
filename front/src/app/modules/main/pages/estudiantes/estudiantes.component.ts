import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/http/user/user.service';
import { Users } from 'src/app/types/users.types';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  students: Users[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.userService.getAll().subscribe((data: Users[]) => {
      this.students = data;
    });
  }

  editStudent(id: number) {
    // Implementar la lógica de edición
    console.log('Editar estudiante con ID:', id);
  }

  deleteStudent(id: number) {
    // Implementar la lógica de eliminación
    console.log('Eliminar estudiante con ID:', id);
  }

  addStudent() {
    // Implementar la lógica de agregar nuevo estudiante
    console.log('Agregar nuevo estudiante');
  }
}
