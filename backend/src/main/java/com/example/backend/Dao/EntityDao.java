package com.example.backend.Dao;

import com.example.backend.Entity.Entity;

public interface EntityDao {
    Entity findByName(String name);
}
