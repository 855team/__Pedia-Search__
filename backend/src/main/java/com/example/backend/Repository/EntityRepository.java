package com.example.backend.Repository;

import com.example.backend.Entity.Entity;
import org.springframework.data.repository.CrudRepository;

public interface EntityRepository extends CrudRepository<Entity, Long> {
    Entity findByName(String name);
}
