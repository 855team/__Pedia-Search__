package com.example.backend.Repository;

import com.example.backend.Entity.Entry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface EntryRepository extends MongoRepository<Entry,Integer> {
    Entry findByTitle(String title);

    @Query("{'page_id':?0}")
    Entry findByPage_id(int page_id);
}
