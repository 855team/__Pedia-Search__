package com.example.backend.ServiceImpl;

import com.example.backend.Dao.EntryDao;
import com.example.backend.Entity.Entry;
import com.example.backend.Service.EntryService;
import org.bson.BasicBSONObject;
import org.bson.types.BasicBSONList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class EntryServiceImpl implements EntryService {
    @Autowired
    private EntryDao entryDao;

    @Override
    public Map<String,Object> findByTitle(String title){
        Entry entry = entryDao.findByTitle(title);
        Map<String,Object> map = new HashMap<>();
        if(entry!=null)
        {
            map.put("title",entry.getTitle());

            BasicBSONObject sections = entry.getSections();

            map.put("text",sections.get("text"));
            map.put("linked_words",sections.get("linked_words"));
            map.put("sections",sections.get("sections"));
        }
        else{
            map.put("title",title);

            BasicBSONList nullList = new BasicBSONList();

            map.put("text","");
            map.put("linked_words",nullList);
            map.put("sections",nullList);
        }
        return map;
    }

    @Override
    public Map<String,Object> findByPage_id(int page_id){
        Entry entry = entryDao.findByPage_id(page_id);
        Map<String,Object> map = new HashMap<>();
        if(entry!=null)
        {
            map.put("title",entry.getTitle());

            BasicBSONObject sections = entry.getSections();

            map.put("text",sections.get("text"));
            map.put("linked_words",sections.get("linked_words"));
            map.put("sections",sections.get("sections"));
        }
        else{
            map.put("title","");

            BasicBSONList nullList = new BasicBSONList();

            map.put("text","");
            map.put("linked_words",nullList);
            map.put("sections",nullList);
        }
        return map;
    }
}
