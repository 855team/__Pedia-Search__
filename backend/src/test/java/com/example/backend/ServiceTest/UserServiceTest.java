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
        Assertions.assertEquals(27, userService.
                SaveRecord("root","test1","test2").getQueryrecordList().size());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void RegisterTest(){
        Assertions.assertAll(
                ()->Assertions.assertTrue(userService.Register("test1","123123")>0),
                ()->Assertions.assertEquals(0,userService.Register("root","123123"))
        );
    }

    @Test
    @Transactional
    @Rollback(true)
    public void GrantTest(){
        Assertions.assertAll(
                ()->Assertions.assertEquals("ROLE_ADMIN",userService.Grant("test").getRole()),
                ()->Assertions.assertEquals(null,userService.Grant("unexisted"))
        );
    }
}
