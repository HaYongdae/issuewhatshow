package lab.latte.issue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lab.latte.issue.dao.IHrDAO;
import lab.latte.issue.model.EmployeeVO;

@Service("hrService")
public class HrService implements IHrService {
	
	@Autowired
	private IHrDAO dao;

	@Override
//	@Transactional
	public List<EmployeeVO> getEmployeesAll() {
		return dao.getEmployeesAll();
	}
	
//	@Override
//	public List<PstationVO> getStationsInRect(HashMap<String, Object> hm) {
//		return dao.getStationsInRect(hm);
//	}


}
