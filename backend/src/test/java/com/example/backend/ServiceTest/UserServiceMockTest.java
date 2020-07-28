package com.example.backend.ServiceTest;

import com.example.backend.Dao.UserDao;
import com.example.backend.Entity.Queryrecord;
import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.sql.Timestamp;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import static org.mockito.Mockito.when;

@SpringBootTest
public class UserServiceMockTest {
    @Autowired
    private UserService userService;

    @MockBean
    private UserDao userDao;

    @Test
    public void QueryRecordTest(){
        User user = new User();

        user.setUserId(1);
        user.setUsername("123");
        user.setPassword("124123");
        user.setRole("ROLE_ADMIN");

        List<Queryrecord> queryrecordList = new LinkedList<>();
        Queryrecord record1 = new Queryrecord(1,1,"test1","test1",new Timestamp(new Date().getTime())),
                record2 = new Queryrecord(2,1,"test2","test2",new Timestamp(new Date().getTime()));
        queryrecordList.add(record1);
        queryrecordList.add(record2);

        user.setQueryrecordList(queryrecordList);

        when(userDao.findByUsername("123")).thenReturn(user);

        Assertions.assertEquals(2,userService.QueryRecord("123").size());
    }
}
