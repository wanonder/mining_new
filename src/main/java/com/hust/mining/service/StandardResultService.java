package com.hust.mining.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hust.mining.model.StandardResult;
import com.hust.mining.model.params.StandardResultQueryCondition;

public interface StandardResultService {
	int insert(StandardResultQueryCondition con, HttpServletRequest request);

    int deleteById(String stdResId);

    StandardResult queryStdResById(String stdResId);
    
    int updateByPrimaryKey(StandardResult record);
    
    List<StandardResult> queryStdRessByIssueId(String issueId);

    List<StandardResult> searchstdRessByTime(String issueId, Date start, Date end);

    List<String[]> getStdResCountById(String stdResId);
    
	List<String[]> getStdResContentById(String stdResId);

    String getDateCount(List<String[]> cluster);
    
    String getSourceCount(List<String[]> cluster);
}
