package com.example.backend.DaoTest;

import com.example.backend.Dao.EntityDao;
import com.example.backend.Entity.Entity;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EntityDaoTest {
    @Autowired
    private EntityDao entityDao;

    @Test
    public void entityDaoTest(){
        Entity entity = entityDao.findByName("历史");
        Assertions.assertAll(
                () -> Assertions.assertEquals("历史",entity.getName()),
                () -> Assertions.assertEquals(305,entity.getEntitySet().size())
        );
    }
}
