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
}
