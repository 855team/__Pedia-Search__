package com.example.backend.DaoImpl;

import com.example.backend.Dao.TrendDao;
import com.example.backend.Entity.Trend;
import com.example.backend.Repository.TrendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public class TrendDaoImpl implements TrendDao{
    @Autowired
    private TrendRepository trendRepository;

//    @Override
//    public List<Trend> findByType(String type){
//        return trendRepository.findByType(type);
//    }

    @Override
    public List<Trend> findAllOrderByTimes() {
        return trendRepository.findAllOrderByTimes();
    }

    @Override
    public Trend saveTrend(Trend trend){
        return trendRepository.saveAndFlush(trend);
    }

    @Override
    @Transactional
    public void deleteByType(String type) {
        trendRepository.deleteByType(type);
        trendRepository.flush();
    }
}
