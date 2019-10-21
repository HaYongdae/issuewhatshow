package lab.latte.issue.dao;

import java.util.List;

import lab.latte.issue.model.EmployeeVO;

public interface IHrDAO {
	
	public List<EmployeeVO> getEmployeesAll();
//	public List<EmployeeVO> getEmployees(HashMap<String, Object> hm);
	
}
