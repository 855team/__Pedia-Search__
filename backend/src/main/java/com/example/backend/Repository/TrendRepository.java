package com.example.backend.Repository;

import com.example.backend.Entity.Trend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TrendRepository extends JpaRepository<Trend,String> {
    List<Trend> findByType(String type);

    @Query(" select t from Trend t order by t.times desc")
    List<Trend> findAllOrderByTimes();

    void deleteByType(String type);
}
