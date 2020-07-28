package com.example.backend.DaoTest;

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
public class EntryDaoTest {
    @Autowired
    private EntryDao entryDao;

    @Test
    public void FindByKeywordTest(){
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

    @Test
    public void FindByPageIdTest(){
        Entry entry = entryDao.findByPage_id(22);
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
