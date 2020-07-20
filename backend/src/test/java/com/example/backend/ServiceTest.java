package com.example.backend;

import com.example.backend.Dao.EntityDao;
import com.example.backend.Entity.Entity;
import com.example.backend.Service.EntityService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.mockito.Mockito.when;

@SpringBootTest
class EntityServiceTest {
    @Autowired
    private EntityService entityService;

    @MockBean
    private EntityDao entityDao;

    @Test
    public void findByKeyword(){
        Entity target = new Entity((long) 1,"上海",1.44);
        target.setId((long) 123);
        target.setName("上海");
        target.setWeight(1.33);

        when(entityDao.findByName("")).thenReturn(target);
    }

}
