package com.example.backend.DaoImpl;

import com.example.backend.Dao.UserDao;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    @Override
    public User saveUser(User user){
        return userRepository.saveAndFlush(user);
    }
}
