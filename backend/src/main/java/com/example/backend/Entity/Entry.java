package com.example.backend.Entity;

import org.bson.types.ObjectId;
import org.bson.types.BasicBSONList;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;

@Document(collection = "entry")
public class Entry {
    @Id
    private ObjectId id;
    private String keyword;
    private BasicBSONList linkedwords;
    private String intro;
    private BasicBSONList dir;

    public ObjectId getId() {
        return id;
    }
    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getKeyword() {
        return keyword;
    }
    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public BasicBSONList getLinkedwords() {
        return linkedwords;
    }
    public void setLinkedwords(BasicBSONList linkedwords) {
        this.linkedwords = linkedwords;
    }

    public String getIntro() {
        return intro;
    }
    public void setIntro(String intro) {
        this.intro = intro;
    }

    public BasicBSONList getDir() {
        return dir;
    }
    public void setDir(BasicBSONList dir) {
        this.dir = dir;
    }
}
