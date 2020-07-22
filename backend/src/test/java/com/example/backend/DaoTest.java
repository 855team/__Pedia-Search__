package com.example.backend;

import com.example.backend.Dao.EntityDao;
import com.example.backend.Dao.EntryDao;
import com.example.backend.Entity.Entity;
import com.example.backend.Entity.Entry;
import org.bson.BasicBSONObject;
import org.bson.types.BasicBSONList;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.LinkedHashMap;

@SpringBootTest
public class DaoTest {
    @Autowired
    private EntryDao entryDao;

    @Autowired
    private EntityDao entityDao;

    @Test
    public void entityDaoTest(){
        Entity entity = entityDao.findByName("历史");
        Assertions.assertAll(
                () -> Assertions.assertEquals("历史",entity.getName()),
                () -> Assertions.assertEquals(272,entity.getEntitySet().size())
        );
    }

    @Test
    public void entryDaoTest(){
        Entry entry = entryDao.findByTitle("历史");
        LinkedHashMap<String,Object> diritem = (LinkedHashMap<String,Object>)
                ((ArrayList<Object>) entry.getSections().get("sections")).get(0);

        Assertions.assertAll(
                () -> Assertions.assertEquals("历史",entry.getTitle()),
                () -> Assertions.assertTrue(diritem.containsKey("title")),
                () -> Assertions.assertTrue(diritem.containsKey("text")),
                () -> Assertions.assertTrue(diritem.containsKey("linked_words")),
                () -> Assertions.assertTrue(diritem.containsKey("sections"))
        );
    }

}
