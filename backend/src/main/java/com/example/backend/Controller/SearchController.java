package com.example.backend.Controller;

import com.example.backend.Service.EntityService;
import com.example.backend.Service.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@CrossOrigin()
@RestController
@RequestMapping("/search")
@EnableAutoConfiguration
public class SearchController {
    @Autowired
    private EntityService entityService;

    @Autowired
    private EntryService entryService;

    @PostMapping(value = "/related",produces = "application/json; charset=utf-8")
    public Map<String,Object> findInNeo4j(@RequestParam("keyword") String keyword){
        return entityService.findByKeyword(keyword);
    }

    @PostMapping(value = "/wiki",produces = "application/json; charset=utf-8")
    public Map<String,Object> findInMongodb(@RequestParam("keyword") String keyword){
        return entryService.findByTitle(keyword);
    }

    @PostMapping(value = "/page_id",produces = "application/json; charset=utf-8")
    public Map<String,Object> findByPageId(@RequestParam("page_id") int page_id){
        return entryService.findByPage_id(page_id);
    }
}
