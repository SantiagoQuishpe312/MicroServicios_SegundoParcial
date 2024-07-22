package com.espe.msvc_cursos.repositories;
import com.espe.msvc_cursos.models.entity.Curso;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CursoRepository extends CrudRepository<Curso,Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM CursoUsuario cu WHERE cu.id = :id AND cu.usuarioId = :userId")
    void deleteCursoUsuario(@Param("id") Long id, @Param("userId") Long userId);

}
