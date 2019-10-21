package lab.latte.issue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lab.latte.issue.dao.ITimelineDAO;
import lab.latte.issue.model.TimelineVO;

@Service("apiService")
public class APIService implements IAPIService {
	
	@Autowired
	private ITimelineDAO dao;

	@Override
//	@Transactional
	public TimelineVO getLastTimeline() {
		return dao.getLastTimeline();
	}
	
//	@Override
//	public List<PstationVO> getStationsInRect(HashMap<String, Object> hm) {
//		return dao.getStationsInRect(hm);
//	}


}
