package lab.latte.issue.dao;

import java.util.List;

import lab.latte.issue.model.EmployeeVO;

public interface ITimelineDAO {
	
	public List<EmployeeVO> getLastTimeline();
//	public List<EmployeeVO> getEmployees(HashMap<String, Object> hm);
	
}
