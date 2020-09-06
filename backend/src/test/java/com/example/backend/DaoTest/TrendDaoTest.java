package com.example.backend.DaoTest;

import com.example.backend.Dao.TrendDao;
import com.example.backend.Entity.Trend;
import com.example.backend.Repository.TrendRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

import static org.mockito.Mockito.when;

@SpringBootTest
public class TrendDaoTest {
    @Autowired
    private TrendDao trendDao;

    @MockBean
    private TrendRepository trendRepository;

    @Test
    public void FindAllTest(){
        when(trendRepository.findAllOrderByTimes()).thenReturn(null);
        Assertions.assertEquals(null,trendDao.findAllOrderByTimes());
    }

    @Test
    public void SaveTrendTest(){
        Trend trend = new Trend("test",10,new Timestamp(10000),new Timestamp(20000),"RANK");
        when(trendRepository.saveAndFlush(trend)).thenReturn(trend);
        Assertions.assertEquals("test",trendDao.saveTrend(trend).getKeyword());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void DeleteTest(){
        trendDao.deleteByType("RANK");
    }
}
