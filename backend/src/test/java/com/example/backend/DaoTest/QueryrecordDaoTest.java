package com.example.backend.DaoTest;

import com.example.backend.Dao.QueryrecordDao;
import com.example.backend.Repository.QueryrecordRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;

import static org.mockito.Mockito.when;

@SpringBootTest
public class QueryrecordDaoTest {
    @Autowired
    private QueryrecordDao queryrecordDao;

    @MockBean
    private QueryrecordRepository queryrecordRepository;

    @Test
    public void CountTest(){
        List objectList = new LinkedList();

        Object[] row1 = new Object[2];
        row1[0] = "历史";
        row1[1] = 1;
        objectList.add((Object) row1);

        Object[] row2 = new Object[2];
        row2[0] = "Reason";
        row2[1] = 2;
        objectList.add((Object) row2);

        when(queryrecordRepository
                .countByQueryTime(new Timestamp(10000),new Timestamp(20000)))
                .thenReturn(objectList);

        Assertions.assertEquals(1,queryrecordDao
                .countByQueryTime(new Timestamp(10000),new Timestamp(20000),1)
                .size());
    }
}
