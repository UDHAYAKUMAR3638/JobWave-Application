package Backend.JobWave.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.Jobseeker;

@Repository
public interface JobseekerRepository extends MongoRepository<Jobseeker, String> {

    Jobseeker findByEmail(String email);
    
}
