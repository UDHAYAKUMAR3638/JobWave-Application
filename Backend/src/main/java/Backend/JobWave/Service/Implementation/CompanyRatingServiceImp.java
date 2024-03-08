package Backend.JobWave.Service.Implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mongodb.client.result.UpdateResult;

import Backend.JobWave.Dao.RecruiterDao;
import Backend.JobWave.Model.CompanyRating;
import Backend.JobWave.Model.Recruiter;
import Backend.JobWave.Repository.CompanyRatingRepository;
import Backend.JobWave.Repository.RecruiterRepository;
import Backend.JobWave.Service.CompanyRatingService;

@Service
public class CompanyRatingServiceImp implements CompanyRatingService {
    @Autowired
    CompanyRatingRepository companyRatingRepository;

    @Autowired
    RecruiterRepository recruiterRepository;

    @Autowired
    RecruiterDao recruiterDao;

    @Override
    public CompanyRating addRating(CompanyRating rating) {
        return companyRatingRepository.save(rating);
    }

    @Override
    public UpdateResult avgRating(Recruiter recruiter) {
        List<CompanyRating> rating = companyRatingRepository.findByCompanyId(recruiter);
        int sum = 0;
        for (CompanyRating x : rating) {
            sum += x.getRating();
        }
        double avg = (sum / rating.size());
        return recruiterDao.updateRecruiter(recruiter.get_id(), avg);
    }

}
