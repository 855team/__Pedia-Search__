package com.example.backend.DaoImpl;

import com.example.backend.Dao.EntityDao;
import com.example.backend.Entity.Entity;
import com.example.backend.Repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class EntityDaoImpl implements EntityDao {
    @Autowired
    private EntityRepository entityRepository;

    @Override
    public Entity findByName(String name){
        return entityRepository.findByName(name);
    }
}
