package com.example.backend.Controller;

import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
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
            @RequestParam("password") String password){
        return userService.Register(username,password);
    }

    @PostMapping(value = "/queryrecord")
    public List<Map<String,Object>> findRecord(Principal principal){
        return userService.QueryRecord(principal.getName());
    }

    @PostMapping(value = "/saverecord")
    public void saveRecord(
            @RequestParam("keyword") String keyword,
            @RequestParam("last_keyword") String last_keyword,
            Principal principal){
        userService.SaveRecord(principal.getName(),keyword,last_keyword);
    }

    @PostMapping(value = "/saverecord_anonymous")
    public void saveRecord_root(
            @RequestParam("keyword") String keyword,
            @RequestParam("last_keyword") String last_keyword){
        userService.SaveRecord("root",keyword,last_keyword);
    }

    @PostMapping(value = "/checklogin")
    public Map<String,Object> checkLogin(Principal principal){
        Map<String,Object> map = new HashMap<>();

        map.put("code",200);
        map.put("message","已登录");
        map.put("username",principal.getName());

        return map;
    }

    @PostMapping(value = "/grant")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public int grant(@RequestParam("username") String username){
        if(userService.Grant(username) != null)
            return 1;
        else
            return 0;
    }
}
