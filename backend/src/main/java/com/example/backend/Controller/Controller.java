package com.example.backend.Controller;

import com.example.backend.Entity.Entry;
import com.example.backend.Service.EntityService;
import com.example.backend.Service.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin()
@RestController
public class Controller {
    @Autowired
    private EntityService entityService;

    @Autowired
    private EntryService entryService;

    @GetMapping(value = "/neo4j",produces = "application/json; charset=utf-8")
    public Map<String,Object> findInNeo4j(@RequestParam("keyword") String keyword){
        return entityService.findByKeyword(keyword);
    }

    @GetMapping(value = "/mongodb",produces = "application/json; charset=utf-8")
    public Entry findInMongodb(@RequestParam("keyword") String keyword){
        return entryService.findByTitle(keyword);
    }
}
