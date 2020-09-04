package com.example.backend.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.BasicBSONObject;
import org.bson.types.ObjectId;
import org.bson.types.BasicBSONList;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "pedia_search")
public class Entry {
    private String title;
    private int page_id;
    private BasicBSONObject sections;

    public Entry(String title,int page_id,BasicBSONObject sections){
        this.title = title;
        this.page_id = page_id;
        this.sections = sections;
    }

//    public String getTitle() {
//        return title;
//    }
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public int getPage_id(){
//        return page_id;
//    }
//    public void setPage_id(int page_id){
//        this.page_id = page_id;
//    }
//
//    public BasicBSONObject getSections() {
//        return sections;
//    }
//    public void setSections(BasicBSONObject sections) {
//        this.sections = sections;
//    }
}
