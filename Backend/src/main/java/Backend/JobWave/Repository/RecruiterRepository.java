package Backend.JobWave.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.Recruiter;

@Repository
public interface RecruiterRepository extends MongoRepository<Recruiter,String> {

    Recruiter findByEmail(String email);

    
}
