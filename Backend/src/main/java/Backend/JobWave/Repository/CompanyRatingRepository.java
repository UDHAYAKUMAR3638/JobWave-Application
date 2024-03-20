package Backend.JobWave.Repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.CompanyRating;
import Backend.JobWave.Model.Recruiter;

@Repository
public interface CompanyRatingRepository extends MongoRepository<CompanyRating, String> {

    List<CompanyRating> findByCompanyId(Recruiter id);

    CompanyRating findByCompanyIdAndJobseekerEmail(ObjectId objectId, String email);

}
