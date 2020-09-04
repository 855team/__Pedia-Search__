package com.example.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import javax.persistence.Entity;

import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Data
@NoArgsConstructor
@Entity
@Table(name = "user",schema = "pedia_search")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "user_id")
public class User {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = IDENTITY)
    private int userId;

    @Basic
    @Column(name = "username")
    private String username;

    @Basic
    @Column(name = "password")
    private String password;

    @Basic
    @Column(name = "role")
    private String role;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @Cascade(value = org.hibernate.annotations.CascadeType.ALL)
    private List<Queryrecord> queryrecordList;

    public User(String name,String password,String role){
        this.username = name;
        this.password = password;
        this.role =role;
    }

//    public int getUserId(){
//        return this.userId;
//    }
//    public void setUserId(int userId){
//        this.userId = userId;
//    }
//
//    public String getUsername(){
//        return this.username;
//    }
//    public void setUsername(String username){
//        this.username = username;
//    }
//
//    public String getPassword(){
//        return this.password;
//    }
//    public void setPassword(String password){
//        this.password = password;
//    }
//
//    public String getRole(){
//        return this.role;
//    }
//    public void setRole(String role){
//        this.role = role;
//    }
//
//    public List<Queryrecord> getQueryrecordList(){
//        return this.queryrecordList;
//    }
//    public void setQueryrecordList(List<Queryrecord> queryrecordList){
//        this.queryrecordList = queryrecordList;
//    }
}
