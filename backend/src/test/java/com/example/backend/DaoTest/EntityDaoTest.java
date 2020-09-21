package com.example.backend.DaoTest;

import com.example.backend.Dao.EntityDao;
import com.example.backend.Entity.Entity;
import com.example.backend.Repository.EntityRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.mockito.Mockito.when;

@SpringBootTest
public class EntityDaoTest {
    @Autowired
    private EntityDao entityDao;

    @MockBean
    private EntityRepository entityRepository;

    @Test
    public void entityDaoTest(){
        Entity entity = new Entity();

        entity.setId((long) 1);
        entity.setName("历史");
        entity.setPage_id(1);
        entity.setWeight(1);

        when(entityRepository.findByName("历史")).thenReturn(entity);
        Assertions.assertAll(
                () -> Assertions.assertEquals("历史",entityDao.findByName("历史").getName()),
                () -> Assertions.assertEquals(0,entityDao.findByName("历史").getEntitySet().size())
        );
    }
}
