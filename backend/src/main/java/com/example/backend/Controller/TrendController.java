package com.example.backend.Controller;

import com.example.backend.Entity.Trend;
import com.example.backend.Service.TrendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/trend")
@EnableAutoConfiguration
public class TrendController {
    @Autowired
    private TrendService trendService;

    @PostMapping(value = "/create",produces = "application/json; charset=utf-8")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Trend> createTrend(
            @RequestParam("startTime") Timestamp start,
            @RequestParam("endTime") Timestamp end,
            @RequestParam("size") int size){
        return trendService.createTrend(start,end,size);
    }

    @GetMapping(value = "/get",produces = "application/json; charset=utf-8")
    public List<Trend> getTrend(){
        return trendService.getTrend();
    }
}
