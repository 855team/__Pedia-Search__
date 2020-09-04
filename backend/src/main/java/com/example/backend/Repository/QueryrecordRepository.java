package com.example.backend.Repository;

import com.example.backend.Entity.Queryrecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface QueryrecordRepository extends JpaRepository<Queryrecord,Integer> {
    @Query(value = " select q.keyword, count(q) as times " +
            " from Queryrecord q " +
            " where ?1 <= q.queryTime and q.queryTime <= ?2 " +
            " group by q.keyword " +
            " order by times desc ")
    List countByQueryTime(Timestamp start,Timestamp end);
}
