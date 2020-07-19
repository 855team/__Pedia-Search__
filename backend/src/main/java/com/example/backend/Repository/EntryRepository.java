package com.example.backend.Repository;

import com.example.backend.Entity.Entry;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EntryRepository extends MongoRepository<Entry,Integer> {
    Entry findByKeyword(String keyword);
}
