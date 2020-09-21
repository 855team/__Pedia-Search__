package com.example.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;
import javax.persistence.Entity;

import java.sql.Timestamp;

import static javax.persistence.GenerationType.IDENTITY;

@Data
@NoArgsConstructor
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

    public Queryrecord(int queryId,int userId,String keyword,String last_keyword,Timestamp queryTime){
        this.queryId = queryId;
        this.userId = userId;
        this.keyword = keyword;
        this.last_keyword = last_keyword;
        this.queryTime = queryTime;
    }
}
