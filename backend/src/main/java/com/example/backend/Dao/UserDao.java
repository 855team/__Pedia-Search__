package com.example.backend.Dao;

import com.example.backend.Entity.User;

public interface UserDao {
    User findByUsername(String username);

    User saveUser(User user);
}
