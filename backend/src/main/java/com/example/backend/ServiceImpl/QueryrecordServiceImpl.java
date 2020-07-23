package com.example.backend.ServiceImpl;

import com.example.backend.Dao.QueryrecordDao;
import com.example.backend.Entity.Queryrecord;
import com.example.backend.Service.QueryrecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QueryrecordServiceImpl implements QueryrecordService {
    @Autowired
    private QueryrecordDao queryrecordDao;

    @Override
    public Queryrecord saveRecord(Queryrecord queryrecord){
        return queryrecordDao.saveRecord(queryrecord);
    }
}
