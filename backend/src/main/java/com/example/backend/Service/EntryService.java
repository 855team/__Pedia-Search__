package com.example.backend.Service;

import com.example.backend.Entity.Entry;

import java.util.Map;

public interface EntryService {
    Map<String,Object> findByTitle(String title);

    Map<String,Object> findByPage_id(int page_id);
}
