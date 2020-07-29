package com.example.backend.Service;

import com.example.backend.Entity.User;

import java.util.List;
import java.util.Map;

public interface UserService {

    List<Map<String,Object>> QueryRecord(String username);

    User SaveRecord(String username,String keyword,String last_keyword);

    int Register(String username,String password);
}
