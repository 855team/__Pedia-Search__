package com.example.backend.ServiceImpl;

import com.example.backend.Dao.UserDao;
import com.example.backend.Entity.Queryrecord;
import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

    @Override
    public List<Map<String,Object>> QueryRecord(String username){
        List<Map<String,Object>> mapList=new LinkedList<>();
        User user = userDao.findByUsername(username);
        for (Queryrecord record:user.getQueryrecordList())
        {
            Map<String,Object> map = new HashMap<>();
            map.put("keyword",record.getKeyword());
            map.put("last_keyword",record.getLast_keyword());
            map.put("query_time",record.getQueryTime());
            mapList.add(map);
        }
        return mapList;
    }

    @Override
    public User SaveRecord(String username,String keyword,String last_keyword){
        User user = userDao.findByUsername(username);

        Queryrecord queryrecord = new Queryrecord();

        queryrecord.setUserId(user.getUserId());
        queryrecord.setKeyword(keyword);
        queryrecord.setLast_keyword(last_keyword);

        List<Queryrecord> queryrecordList=user.getQueryrecordList();
        queryrecordList.add(queryrecord);

        user.setQueryrecordList(queryrecordList);

        return userDao.saveUser(user);
    }

    @Override
    public int Register(String username,String password){
        User user = userDao.findByUsername(username);
        if(user==null)
        {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(encoder.encode(password));
            newUser.setRole("ROLE_USER");
            return  userDao.saveUser(newUser).getUserId();
        }
        else{
            return 0;
        }
    }
}
