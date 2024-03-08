package Backend.JobWave.Service;

import org.springframework.stereotype.Service;

import com.mongodb.client.result.UpdateResult;

import Backend.JobWave.Model.CompanyRating;
import Backend.JobWave.Model.Recruiter;

@Service
public interface CompanyRatingService {

    public CompanyRating addRating(CompanyRating rating);

    public UpdateResult avgRating(Recruiter recruiter);
}
