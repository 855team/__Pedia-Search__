package com.example.backend.Dao;

import com.example.backend.Entity.Trend;

import java.util.List;

public interface TrendDao {
//    List<Trend> findByType(String type);

    List<Trend> findAllOrderByTimes();

    Trend saveTrend(Trend trend);

    void deleteByType(String type);
}
