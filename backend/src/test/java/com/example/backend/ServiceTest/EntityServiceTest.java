package com.example.backend.ServiceTest;

import com.example.backend.Dao.EntityDao;
import com.example.backend.Entity.Entity;
import com.example.backend.Service.EntityService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@SpringBootTest
public class EntityServiceTest {
    @Autowired
    private EntityService entityService;

    @MockBean
    private EntityDao entityDao;

    @Test
    public void FindByKeywordTest(){
        Assertions.assertAll(
                ()->{
                    Entity target = new Entity((long)1,"北京",123,1.44),
                            e1 = new Entity((long)2,"上海",3412,1.66),
                            e2 = new Entity((long)3,"上海交通大学",2314,0.44),
                            e3 = new Entity((long)4,"英雄联盟S10",5643,3.12);
                    Set<Entity> entitySet = new HashSet<>();
                    entitySet.add(e1);
                    entitySet.add(e2);
                    entitySet.add(e3);
                    target.setEntitySet(entitySet);

                    when(entityDao.findByName("北京")).thenReturn(target);

                    Object list = entityService.findByKeyword("北京").get("linked_words");

                    Assertions.assertEquals(3, ((List<Map<String,Object>>) list).size());
                },
                ()->{
                    when(entityDao.findByName("朔溪")).thenReturn(null);

                    Object list = entityService.findByKeyword("朔溪").get("linked_words");

                    Assertions.assertEquals(0, ((List<Map<String,Object>>) list).size());
                }
        );

    }
}
