package com.example.backend.Service;


import com.example.backend.Entity.Trend;

import java.sql.Timestamp;
import java.util.List;

public interface TrendService {
    List<Trend> createTrend(Timestamp start,Timestamp end, int size);

    List<Trend> getTrend();

//    Trend recommendTrend(String keyword);
//
//    Trend banTrend(String keyword);
}
