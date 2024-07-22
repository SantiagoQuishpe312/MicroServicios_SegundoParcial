package com.espe.msvc_cursos.controllers;

import com.espe.msvc_cursos.constants.GlobalConstants;
import com.espe.msvc_cursos.models.Usuario;
import com.espe.msvc_cursos.models.entity.Curso;
import com.espe.msvc_cursos.services.CursoService;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.*;

@RestController
@RequestMapping(GlobalConstants.V1_API_VERSION + GlobalConstants.API_PUBLIC+ "/cursos")
@CrossOrigin(origins = "*")
public class CursoController {
    @Autowired
    private CursoService cursoService;
     @GetMapping("/getAll")
    public List<Curso> listar(){
         return cursoService.listar();
     }


    @GetMapping("/getById/{id}")
    public ResponseEntity<?> detalle(@PathVariable Long id){
         Optional<Curso> cursoOptional=cursoService.porId(id);
         if(cursoOptional.isPresent()){
             return ResponseEntity.ok().body(cursoOptional.get());
         }
         return ResponseEntity.notFound().build();
     }
    @PostMapping("/add")
    public ResponseEntity<?> crear(@Valid @RequestBody Curso curso, BindingResult result) {
        if(result.hasErrors()){
            return validar(result);
        }
         Curso cursoGuardado = cursoService.guardar(curso);
        return ResponseEntity.status(HttpStatus.CREATED).body(cursoGuardado);
    }
    private static ResponseEntity<Map<String, String>> validar(BindingResult result){
        Map<String, String >errores=new HashMap<>();
        result.getFieldErrors().forEach(err->{
            errores.put(err.getField(),"El campo "+err.getField()+" "+err.getDefaultMessage());

        });
        return ResponseEntity.badRequest().body(errores);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody Curso curso, @PathVariable Long id, BindingResult result) {
        if(result.hasErrors()){
            return validar(result);
        }
         Optional<Curso> cursoOptional = cursoService.porId(id);
        if (cursoOptional.isPresent()) {
            Curso cursoDB = cursoOptional.get();
            cursoDB.setNombre(curso.getNombre());

            return ResponseEntity.status(HttpStatus.CREATED).body(cursoService.guardar(cursoDB));
        }
        return ResponseEntity.notFound().build();
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Optional<Curso> optionalUsuario = cursoService.porId(id);
        if (optionalUsuario.isPresent()) {
            cursoService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/asignar-usuario/{idcurso}")
    public ResponseEntity<?> asignarUsuario(@RequestBody Usuario usuario, @PathVariable Long idcurso) {
        Optional<Usuario> o;
        try {
            o = cursoService.agregarUsuario(usuario, idcurso);
        } catch (FeignException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("mensaje", "Error: " + e.getMessage()));
        }

        if (o.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(o.get());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(o.get());
    }

    @DeleteMapping("/eliminar-del-curso/{idCurso}/usuario/{idUsuario}")
    public ResponseEntity<Usuario> eliminarUsuarioDelCurso(
            @PathVariable Long idCurso,
            @PathVariable Long idUsuario) {

        Usuario usuario = new Usuario();
        usuario.setId(idUsuario);
        Optional<Usuario> usuarioEliminado = cursoService.eliminarUsuario(usuario, idCurso);

        if (usuarioEliminado.isPresent()) {
            return ResponseEntity.ok(usuarioEliminado.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
