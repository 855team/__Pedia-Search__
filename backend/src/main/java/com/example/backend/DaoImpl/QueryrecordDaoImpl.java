package com.example.backend.DaoImpl;

import com.example.backend.Dao.QueryrecordDao;
import com.example.backend.Entity.Queryrecord;
import com.example.backend.Repository.QueryrecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class QueryrecordDaoImpl implements QueryrecordDao {
    @Autowired
    private QueryrecordRepository queryrecordRepository;

    @Override
    public List<Map<String, Object>> countByQueryTime(Timestamp start, Timestamp end, int size) {
        List objectList = queryrecordRepository.countByQueryTime(start,end);

        List<Map<String,Object>> mapList = new ArrayList<>();

        for (Object object:objectList){
            Object[] row = (Object[]) object;
            Map<String,Object> map = new HashMap<String, Object>();

            map.put("keyword",row[0]);
            map.put("times",row[1]);

            mapList.add(map);

            if(mapList.size() == size)
                break; }

        return mapList;
    }
}
