package com.hust.mining.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hust.mining.model.Issue;
import com.hust.mining.model.params.IssueQueryCondition;

public interface IssueService {

    int createIssue(String issueName, String issueType, HttpServletRequest request);
   
    int createIssueWithLink(String linkedIssueId, String issueType, String stdResId, HttpServletRequest request);

    int deleteIssueById(String issueId,String issueType,HttpServletRequest request);

    String getCurrentIssueId(HttpServletRequest request);

    List<Issue> queryIssue(IssueQueryCondition con);
    
    long queryIssueCount(IssueQueryCondition con);

    Issue queryIssueById(String issueId);

    int updateIssueInfo(Issue issue,HttpServletRequest request);

    List<String[]> miningByTime(Date start, Date end,HttpServletRequest request);

    List<String[]> miningByFileIds(List<String> fileIds, HttpServletRequest request);

}
