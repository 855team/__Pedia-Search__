package com.example.backend.Controller;

import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@CrossOrigin()
@RestController
@RequestMapping("/user")
@EnableAutoConfiguration
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(value = "/register")
    public int Register(
            @RequestParam("username") String username,
            @RequestParam("password") String password
    ){
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
        System.out.println(ft.format(new Date())+" --- Register: "+username);
        return userService.Register(username,password);
    }

    @PostMapping(value = "/queryrecord")
    public List<Map<String,Object>> findRecord(Principal principal){
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
        System.out.println(ft.format(new Date())+" --- Query record: "+principal.getName());

        return userService.QueryRecord(principal.getName());
    }

    @PostMapping(value = "/saverecord")
    public void saveRecord(
            @RequestParam("keyword") String keyword,
            @RequestParam("last_keyword") String last_keyword,
            Principal principal
    ){
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
        System.out.println(ft.format(new Date())+" --- Save record: "+principal.getName());

        userService.SaveRecord(principal.getName(),keyword,last_keyword);
    }
}
