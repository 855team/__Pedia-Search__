package com.example.backend.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.*;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
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

    public Entity(Long id,String name,int page_id,double weight){
        this.id = id;
        this.name = name;
        this.page_id = page_id;
        this.weight = weight;
        this.entitySet = new HashSet<>();
    }
}
