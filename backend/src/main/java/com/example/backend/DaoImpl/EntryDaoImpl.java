package com.example.backend.DaoImpl;

import com.example.backend.Dao.EntryDao;
import com.example.backend.Entity.Entry;
import com.example.backend.Repository.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class EntryDaoImpl implements EntryDao {
    @Autowired
    private EntryRepository entryRepository;

    @Override
    public Entry findByTitle(String title){
        return entryRepository.findByTitle(title);
    }

    @Override
    public Entry findByPage_id(int page_id){
        return entryRepository.findByPage_id(page_id);
    }
}
