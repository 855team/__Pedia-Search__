package com.example.backend.Entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.persistence.Entity;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@Entity
@Table(name = "trend",schema = "pedia_search")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "keyword")
public class Trend {
    @Id
    @Column(name = "keyword")
    private String keyword;

    @Basic
    @Column(name = "times")
    private int times;

    @Basic
    @Column(name = "start_time")
    @JSONField(format="yyyy-MM-dd HH:mm:ss")
    private Timestamp startTime;

    @Basic
    @Column(name = "end_time")
    @JSONField(format="yyyy-MM-dd HH:mm:ss")
    private Timestamp endTime;

    @Basic
    @Column(name = "type")
    private String type;

    public Trend(String keyword,int times,Timestamp startTime,Timestamp endTime,String type){
        this.keyword = keyword;
        this.times = times;
        this.startTime = startTime;
        this.endTime = endTime;
        this.type = type;
    }
}
