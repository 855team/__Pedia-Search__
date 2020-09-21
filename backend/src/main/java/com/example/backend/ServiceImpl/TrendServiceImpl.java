package com.example.backend.ServiceImpl;

import com.example.backend.Dao.QueryrecordDao;
import com.example.backend.Dao.TrendDao;
import com.example.backend.Entity.Trend;
import com.example.backend.Service.TrendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Service
public class TrendServiceImpl implements TrendService {
    @Autowired
    private TrendDao trendDao;

    @Autowired
    private QueryrecordDao queryrecordDao;

    @Override
    public List<Trend> createTrend(Timestamp start, Timestamp end, int size) {
        List<Map<String,Object>> mapList = queryrecordDao.countByQueryTime(start,end,size);

        trendDao.deleteByType("RANK");

        for(Map<String,Object> map:mapList)
        {
            Trend newTrend = new Trend((String)map.get("keyword"),((Long)map.get("times")).intValue(),start,end,"RANK");

            trendDao.saveTrend(newTrend);
        }

        return trendDao.findAllOrderByTimes();
    }

    @Override
    public List<Trend> getTrend() {
        return trendDao.findAllOrderByTimes();
    }

//    @Override
//    public Trend recommendTrend(String keyword) {
//        return null;
//    }
//
//    @Override
//    public Trend banTrend(String keyword) {
//        return null;
//    }
}
