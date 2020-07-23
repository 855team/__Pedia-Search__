package com.example.backend.DaoImpl;

import com.example.backend.Dao.QueryrecordDao;
import com.example.backend.Entity.Queryrecord;
import com.example.backend.Repository.QueryrecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class QueryrecordDaoImpl implements QueryrecordDao {
    @Autowired
    private QueryrecordRepository queryrecordRepository;

    @Override
    public Queryrecord saveRecord(Queryrecord queryrecord){
        return queryrecordRepository.saveAndFlush(queryrecord);
    }
}
