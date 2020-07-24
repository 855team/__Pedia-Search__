package com.example.backend.Repository;

import com.example.backend.Entity.Queryrecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QueryrecordRepository extends JpaRepository<Queryrecord,Integer> {
}
