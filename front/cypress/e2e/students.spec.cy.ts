describe('Students List', () => {
    beforeEach(() => {
      // Configura el local storage con los tokens antes de cada prueba
      cy.visit('http://localhost:4200', {
        onBeforeLoad(win) {
          win.sessionStorage.setItem('id_token', 'eyJ4NXQiOiJOVEl3TlRjMU9EazVNVGxqTlRRME5XVXdaRFV4WldZd1lUUm1NREEyTXpSaE5UYzFabVV6TWciLCJraWQiOiJOVEl3TlRjMU9EazVNVGxqTlRRME5XVXdaRFV4WldZd1lUUm1NREEyTXpSaE5UYzFabVV6TWciLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoieVFMRHhMcElQNlRYU2l2ZXNoMEpYQSIsInN1YiI6InNkcXVpc2hwZTEiLCJhbXIiOltdLCJpc3MiOiJodHRwczpcL1wvc3J2Y2FzLmVzcGUuZWR1LmVjXC9vYXV0aDJlbmRwb2ludHNcL3Rva2VuIiwiZ3JvdXBzIjoiSW50ZXJuYWxcL2V2ZXJ5b25lIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiU0FOVElBR08gREFWSUQgUVVJU0hQRSBNQUlHVUEiLCJnaXZlbl9uYW1lIjoiU0FOVElBR08gREFWSUQiLCJub25jZSI6IlJTMXFVRFZTYld0Zk9XSlZRV1pCU1ZoeU5rWm9iWHA2YjFvM1NIaDVWRE52ZGtRMlVTNHpPRlJxZDB0VyIsInNpZCI6IjUzM2RjODU4LWY0MGEtNGUwYy1iN2RkLWY4MGU2MzI3NGM2YSIsImF1ZCI6IkZfMTNWVE5QZFZIUFNzdFVadFltbGRmbDJVWWEiLCJhenAiOiJGXzEzVlROUGRWSFBTc3RVWnRZbWxkZmwyVVlhIiwibmFtZSI6IlNBTlRJQUdPIERBVklEIFFVSVNIUEUgTUFJR1VBIiwiZW1wbG95ZWVfbnVtYmVyIjoiTDAwNDA0Nzk0IiwiZXhwIjoxNzIxNjc2NDAxLCJpYXQiOjE3MjE2NzI4MDEsImZhbWlseV9uYW1lIjoiUVVJU0hQRSBNQUlHVUEiLCJlbWFpbCI6InNkcXVpc2hwZTFAZXNwZS5lZHUuZWMifQ.Me7LXkm9AJcJOYEWSRkYf2prfgBch7j6mxEofenLKgwHs5OTGoTr6jJPCa-yXynVt0hadt_Dd3CgBjQf0yVUAyIu-qo5fcaldUZT3Sm8zFKSP37VYk0Otl6YWmj_aIQpyYUE7vFLVybHxMx4nR_sQJzg8AKiZ0CY3ElCeXi7egHfS2J_83a8d5sHJVrBEUnHTdJPzbXqGnO8gjOkAa5fMz8hENCzEqtUPbTujpCaTZ0kWlYGU9URkvI1qe-drLkt8hcKUMMn-LW8NtYcZqEBMVZAmbR95UEc-VjosQIPrpP_UcTv-LWZlyt5BU0NdVDaawFFfHVbr4pYtnPQCLQL9g'); // Tu id_token aquí
          win.sessionStorage.setItem('access_token', '46b3d9a4-29b9-34a8-93ce-e34ed07530ae'); 
        }
      });
  
      cy.visit('http://localhost:4200/main/students');
    });
  
    it('debería mostrar la lista de estudiantes', () => {
      // Asegúrate de que la página cargó correctamente
      cy.contains('mat-card-title', 'Listado de Estudiantes');
  
      // Verifica que la lista de cursos contiene al menos un curso
      cy.get('table.mat-table').find('tr.mat-row').should('have.length.greaterThan', 0);
    });
  
    it('debería permitir agregar un nuevo estudiante', () => {
      // Abre el diálogo para agregar un nuevo curso
      cy.contains('button', 'Agregar Estudiante').click();
  
      // Llena el formulario del nuevo curso
      cy.get('input[formControlName="nombre"]').type('Nuevo Estudiante');
      cy.get('input[formControlName="email"]').type('nuevoestudiante@example.com');
      cy.get('input[formControlName="password"]').type('Nuevo Estudiante');

      //cy.contains('button','Agregar').click({force:true});
      //cy.get('button').contains('Agregar').click({force:true});
      cy.get('button').contains('Agregar').click({force:true});
  
      // Llena el formulario del nuevo curso
      
      // Verifica que el nuevo curso aparece en la lista
      cy.get('table.mat-table').contains('td', 'Nuevo Estudiante');
    });
  
    it('debería permitir editar un estudiante', () => {
      // Abre el diálogo para editar el primer curso
      cy.get('table.mat-table').find('tr.mat-row').first().within(() => {
        cy.get('i.fa-edit').click();
      });
  
      // Edita el nombre del curso
      cy.get('input[formControlName="nombre"]').clear().type('Estudiante Editado');
      cy.get('button').contains('Guardar').click();
  
      // Verifica que el nombre del curso ha sido actualizado
      cy.get('table.mat-table').contains('td', 'Estudiante Editado');
    });
  
    it('debería permitir eliminar un estudiante', () => {
      // Asegúrate de que hay al menos un curso antes de eliminar
      cy.get('table.mat-table').find('tr.mat-row').then($courses => {
        const initialLength = $courses.length;
  
        // Abre el diálogo de confirmación para eliminar el primer curso
        cy.get('table.mat-table').find('tr.mat-row').first().within(() => {
          cy.get('i.fa-trash-alt').click();
        });
  
        // Confirmar eliminación
        cy.get('button').contains('Eliminar').click();
  
        // Verifica que el curso ha sido eliminado de la lista
        cy.get('table.mat-table').find('tr.mat-row').should('have.length.lessThan', initialLength);
      });
    });
  
  
  });
  