package com.example.backend.ServiceTest;

import com.example.backend.Service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;



@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;

    @Test
    @Transactional
    @Rollback(true)
    public void SaveRecordTest(){
        Assertions.assertEquals(3, userService.
                SaveRecord("855team","test1","test2").getQueryrecordList().size());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void RegisterTest(){
        Assertions.assertAll(
                ()->Assertions.assertTrue(userService.Register("test1","123123")>0),
                ()->Assertions.assertEquals(0,userService.Register("855team","123123"))
        );
    }
}
