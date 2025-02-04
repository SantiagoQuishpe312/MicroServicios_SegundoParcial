package com.espe.msvc.usuarios.services;
import com.espe.msvc.usuarios.models.entity.Usuario;
import com.espe.msvc.usuarios.repositories.UsuarioRepository;

import java.util.List;
import java.util.Optional;
public interface UsuarioService {
    List<Usuario> listar();
    Optional<Usuario> porId(long id);
    Usuario guardar(Usuario usuario);
    void eliminar(Long id);
}
