package com.example.backend.Entity;

import org.neo4j.ogm.annotation.*;

import java.util.HashSet;
import java.util.Set;

@NodeEntity(label = "Entry")
public class Entity {
    @Id
    @GeneratedValue
    private Long id;

    @Property(name = "title")
    private String name;

    @Property(name = "page_id")
    private int page_id;

    @Property(name = "weight")
    private double weight;

    @Relationship(type = "linkTo")
    Set<Entity> entitySet = new HashSet<>();

    public Entity(){};

    public Entity(Long id,String name,int page_id,double weight){
        this.id = id;
        this.name = name;
        this.page_id = page_id;
        this.weight = weight;
        this.entitySet = new HashSet<>();
    }

    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id = id;
    }

    public String getName(){
        return this.name;
    }
    public void setName(String name){
        this.name = name;
    }

    public int getPage_id(){
        return this.page_id;
    }
    public void setPage_id(int page_id){
        this.page_id = page_id;
    }

    public double getWeight(){
        return this.weight;
    }
    public void setWeight(double weight){
        this.weight = weight;
    }

    public Set<Entity> getEntitySet(){
        return this.entitySet;
    }
    public void setEntitySet(Set<Entity> entitySet){
        this.entitySet = entitySet;
    }
}
