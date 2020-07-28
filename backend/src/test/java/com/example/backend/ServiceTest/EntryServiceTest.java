package com.example.backend.ServiceTest;

import com.example.backend.Dao.EntryDao;
import com.example.backend.Entity.Entry;
import com.example.backend.Service.EntryService;

import org.bson.BasicBSONObject;
import org.bson.types.BasicBSONList;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Map;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@SpringBootTest
class EntryServiceTest {
    @Autowired
    private EntryService entryService;

    @MockBean
    private EntryDao entryDao;

    @Test
    public void FindByTitleTest(){
        Assertions.assertAll(
                ()->{
                    BasicBSONObject bsonObject = new BasicBSONObject();
                    bsonObject.append("title","summary");
                    bsonObject.append("text","balabala");

                    BasicBSONList linkedwords = new BasicBSONList();
                    linkedwords.add("1");
                    linkedwords.add("2");
                    bsonObject.append("linked_words",linkedwords);

                    BasicBSONList sections = new BasicBSONList();
                    bsonObject.append("sections",sections);

                    Entry entry = new Entry("上海",1123,bsonObject);

                    when(entryDao.findByTitle("上海")).thenReturn(entry);

                    Assertions.assertAll(
                            ()->Assertions.assertEquals("上海", entryService.findByTitle("上海").get("title")),
                            ()->Assertions.assertEquals("balabala",entryService.findByTitle("上海").get("text")),
                            ()->Assertions.assertEquals(2,((BasicBSONList)entryService.findByTitle("上海").get("linked_words")).size()),
                            ()->Assertions.assertTrue(entryService.findByTitle("上海").containsKey("sections"))
                    );
                },
                ()->{
                    when(entryDao.findByTitle("白开心")).thenReturn(null);

                    Map<String,Object> map = entryService.findByTitle("白开心");

                    Assertions.assertAll(
                            ()->Assertions.assertEquals("",map.get("text")),
                            ()->Assertions.assertEquals(0,((BasicBSONList)map.get("linked_words")).size()),
                            ()->Assertions.assertEquals(0,((BasicBSONList)map.get("sections")).size())
                    );
                }
        );
    }

    @Test
    public void FindByPageIdTest(){
        Assertions.assertAll(
                ()->{
                    BasicBSONObject bsonObject = new BasicBSONObject();
                    bsonObject.append("title","summary");
                    bsonObject.append("text","balabala");

                    BasicBSONList linkedwords = new BasicBSONList();
                    linkedwords.add("1");
                    linkedwords.add("2");
                    bsonObject.append("linked_words",linkedwords);

                    BasicBSONList sections = new BasicBSONList();
                    bsonObject.append("sections",sections);

                    Entry entry = new Entry("上海",1123,bsonObject);

                    when(entryDao.findByPage_id(1123)).thenReturn(entry);

                    Map<String,Object> map = entryService.findByPage_id(1123);

                    Assertions.assertAll(
                            ()->Assertions.assertEquals("上海", map.get("title")),
                            ()->Assertions.assertEquals("balabala",map.get("text")),
                            ()->Assertions.assertEquals(2,((BasicBSONList)map.get("linked_words")).size()),
                            ()->Assertions.assertTrue(map.containsKey("sections"))
                    );
                },
                ()->{
                    when(entryDao.findByPage_id(403)).thenReturn(null);

                    Map<String,Object> map = entryService.findByPage_id(403);

                    Assertions.assertAll(
                            ()->Assertions.assertEquals("",map.get("text")),
                            ()->Assertions.assertEquals(0,((BasicBSONList)map.get("linked_words")).size()),
                            ()->Assertions.assertEquals(0,((BasicBSONList)map.get("sections")).size())
                    );
                }
        );
    }
}
