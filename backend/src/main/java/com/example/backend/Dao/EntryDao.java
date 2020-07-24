package com.example.backend.Dao;

import com.example.backend.Entity.Entry;

public interface EntryDao {
    Entry findByTitle(String title);

    Entry findByPage_id(int page_id);
}
