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
    public Entry findByKeyword(String keyword){
        return entryRepository.findByKeyword(keyword);
    }
}
