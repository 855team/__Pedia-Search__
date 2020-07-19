package com.example.backend.Entity;

import org.neo4j.ogm.annotation.*;

import java.util.HashSet;
import java.util.Set;

@NodeEntity(label = "Entity")
public class Entity {
    @Id
    @GeneratedValue
    private Long id;

    @Property(name = "name")
    private String name;

    @Property(name = "weight")
    private float weight;

    @Relationship(type = "LinkTo")
    Set<Entity> entitySet = new HashSet<>();


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

    public float getWeight(){
        return this.weight;
    }
    public void setWeight(float weight){
        this.weight = weight;
    }

    public Set<Entity> getEntitySet(){
        return this.entitySet;
    }
    public void setEntitySet(Set<Entity> entitySet){
        this.entitySet = entitySet;
    }
}
