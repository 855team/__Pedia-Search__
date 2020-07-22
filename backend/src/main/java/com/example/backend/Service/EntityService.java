package com.example.backend.Service;

import java.util.Map;

public interface EntityService {
    Map<String,Object> findByKeyword(String keyword);
}
