package com.example.backend.Service;

import com.example.backend.Entity.Entry;

public interface EntryService {
    Entry findByTitle(String title);
}
