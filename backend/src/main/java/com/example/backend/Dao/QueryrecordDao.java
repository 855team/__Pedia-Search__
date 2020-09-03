package com.example.backend.Dao;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public interface QueryrecordDao {
    List<Map<String,Object>> countByQueryTime(Timestamp start,Timestamp end,int size);
}
