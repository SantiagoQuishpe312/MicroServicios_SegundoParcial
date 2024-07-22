package com.espe.msvc_cursos.clients;

import com.espe.msvc_cursos.constants.GlobalConstants;
import com.espe.msvc_cursos.models.Usuario;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "msvc-usuarios", url = "http://localhost:8001" + GlobalConstants.V1_API_VERSION + GlobalConstants.API_PUBLIC + "/usuarios")
public interface UsuarioClientRest {
    @GetMapping("/getById/{id}")
    Usuario detalle(@PathVariable Long id);

    @PostMapping
    Usuario crear(@RequestBody Usuario usuario);
}
