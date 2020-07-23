package com.example.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.CreationTimestamp;
import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;
import javax.persistence.Entity;

import java.sql.Timestamp;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "query_record",schema = "pedia_search")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "query_id")
public class Queryrecord {
    @Id
    @Column(name="query_id")
    @GeneratedValue(strategy = IDENTITY)
    private int queryId;

    @Basic
    @Column(name = "user_id")
    private int userId;

    @Basic
    @Column(name = "keyword")
    private String keyword;

    @Basic
    @Column(name = "last_keyword")
    private String last_keyword;

    @Basic
    @Column(name = "query_time")
    @CreationTimestamp
    @JSONField(format="yyyy-MM-dd HH:mm:ss")
    private Timestamp queryTime;

    public int getQueryId(){
        return this.queryId;
    }
    public void setQueryId(int queryId){
        this.queryId = queryId;
    }

    public int getUserId(){
        return this.userId;
    }
    public void setUserId(int userId){
        this.userId = userId;
    }

    public String getKeyword(){
        return this.keyword;
    }
    public void setKeyword(String keyword){
        this.keyword = keyword;
    }

    public String getLast_keyword(){
        return this.last_keyword;
    }
    public void setLast_keyword(String last_keyword){
        this.last_keyword = last_keyword;
    }

    public Timestamp getQueryTime(){
        return this.queryTime;
    }
    public void setQueryTime(Timestamp queryTime){
        this.queryTime = queryTime;
    }
}