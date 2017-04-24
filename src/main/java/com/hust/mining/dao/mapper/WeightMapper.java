package com.hust.mining.dao.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;

import com.hust.mining.model.Weight;
import com.hust.mining.model.WeightExample;

public interface WeightMapper {
    long countByExample(WeightExample example);

    int deleteByExample(WeightExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Weight record);

    int insertSelective(Weight record);

    List<Weight> selectByExample(WeightExample example);

    Weight selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Weight record, @Param("example") WeightExample example);

    int updateByExample(@Param("record") Weight record, @Param("example") WeightExample example);

    int updateByPrimaryKeySelective(Weight record);

    int updateByPrimaryKey(Weight record);
}