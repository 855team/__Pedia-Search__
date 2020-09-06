package com.example.backend.ServiceTest;

import com.example.backend.Dao.QueryrecordDao;
import com.example.backend.Dao.TrendDao;
import com.example.backend.Entity.Queryrecord;
import com.example.backend.Entity.Trend;
import com.example.backend.Service.TrendService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.when;

@SpringBootTest
public class TrendServiceTest {
    @Autowired
    private TrendService trendService;

    @MockBean
    private TrendDao trendDao;

    @MockBean
    private QueryrecordDao queryrecordDao;

    @Test
    public void CreateTrendTest() throws Exception{
        Map<String,Object> map = new HashMap<>();
        map.put("times",(long)1000);
        map.put("keyword","test");

        List<Map<String,Object>> mapList = new LinkedList<>();
        mapList.add(map);

        when(queryrecordDao.countByQueryTime(
                        new Timestamp(10000), new Timestamp(20000),10))
                .thenReturn(mapList);

        List<Trend> trendList = new LinkedList<>();
        trendList.add(new Trend("test",1000,new Timestamp(10000),new Timestamp(20000),"RANK"));
        when(trendDao.findAllOrderByTimes()).thenReturn(trendList);

        Assertions.assertEquals(1,trendService.createTrend(
                new Timestamp(10000),new Timestamp(20000),10).size());
    }

    @Test
    public void GetTrendTest() throws Exception{
        List<Trend> trendList = new LinkedList<>();
        when(trendDao.findAllOrderByTimes()).thenReturn(trendList);

        Assertions.assertEquals(0,trendService.getTrend().size());
    }
}
