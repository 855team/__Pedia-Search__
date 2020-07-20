package com.example.backend;

import com.example.backend.Dao.EntityDao;
import com.example.backend.Dao.EntryDao;
import com.example.backend.Entity.Entity;
import com.example.backend.Entity.Entry;
import com.example.backend.Service.EntityService;
import com.example.backend.Service.EntryService;

import org.bson.BasicBSONObject;
import org.bson.types.BasicBSONList;
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
class ServiceTest {
    @Autowired
    private EntityService entityService;

    @Autowired
    private EntryService entryService;

    @MockBean
    private EntityDao entityDao;

    @MockBean
    private EntryDao entryDao;

    @Test
    public void entityServiceTest(){
        Entity target = new Entity((long)1,"北京",123,1.44),
                e1 = new Entity((long)2,"上海",3412,1.66),
                e2 = new Entity((long)3,"上海交通大学",2314,0.44),
                e3 = new Entity((long)4,"英雄联盟S10",5643,3.12);
        Set<Entity> entitySet = new HashSet<>();
        entitySet.add(e1);
        entitySet.add(e2);
        entitySet.add(e3);
        target.setEntitySet(entitySet);

        when(entityDao.findByName(anyString())).thenReturn(target);

        Object list = entityService.findByKeyword(anyString()).get("linked_words");

        Assertions.assertEquals(3, ((List<Map<String,Object>>) list).size());
    }

    @Test
    public void entryServiceTest(){
        BasicBSONObject bsonObject = new BasicBSONObject();
        bsonObject.append("title","文化");
        bsonObject.append("text","balabala");

        BasicBSONList sections = new BasicBSONList();
        bsonObject.append("sections",sections);

        Entry entry = new Entry("上海",1123,bsonObject);

        when(entryDao.findByTitle(anyString())).thenReturn(entry);

        Assertions.assertEquals(entry, entryService.findByTitle("上海"));
    }
}
