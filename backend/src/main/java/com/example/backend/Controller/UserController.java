package com.example.backend.Controller;

import com.example.backend.Entity.Queryrecord;
import com.example.backend.Entity.User;
import com.example.backend.Service.EntityService;
import com.example.backend.Service.EntryService;
import com.example.backend.Service.QueryrecordService;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@CrossOrigin()
@RestController
@RequestMapping("/user")
@EnableAutoConfiguration
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private QueryrecordService queryrecordService;

    @PostMapping(value = "/register")
    public int Register(
            @RequestParam("username") String username,
            @RequestParam("password") String password
    ){
        return userService.Register(username,password);
    }

    @PostMapping(value = "/queryrecord")
    public List<Map<String,Object>> findRecord(Principal principal){
        System.out.println("Query record: "+principal.getName());

        return userService.QueryRecord(principal.getName());
    }

    @PostMapping(value = "/saverecord")
    public void saveRecord(
            @RequestParam("keyword") String keyword,
            @RequestParam("last_keyword") String last_keyword,
            Principal principal
    ){
        System.out.println("Save record: "+principal.getName());

        userService.SaveRecord(principal.getName(),keyword,last_keyword);
    }
}
