package com.example.backend.DaoTest;

import com.example.backend.Dao.EntityDao;
import com.example.backend.Dao.EntryDao;
import com.example.backend.Entity.Entity;
import com.example.backend.Entity.Entry;
import com.example.backend.Repository.EntryRepository;
import org.bson.BasicBSONObject;
import org.bson.types.BasicBSONList;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.mockito.Mockito.when;

@SpringBootTest
public class EntryDaoTest {
    @Autowired
    private EntryDao entryDao;

    @MockBean
    private EntryRepository entryRepository;

    @Test
    public void FindByKeywordTest(){
        Entry entry = new Entry("历史",22,new BasicBSONObject());

        when(entryRepository.findByTitle("历史")).thenReturn(entry);
        Assertions.assertEquals(22,entryDao.findByTitle("历史").getPage_id());
    }

    @Test
    public void FindByPageIdTest(){
        Entry entry = new Entry("历史",22,new BasicBSONObject());

        when(entryRepository.findByPage_id(22)).thenReturn(entry);
        Assertions.assertEquals("历史",entryDao.findByPage_id(22).getTitle());
    }

}
