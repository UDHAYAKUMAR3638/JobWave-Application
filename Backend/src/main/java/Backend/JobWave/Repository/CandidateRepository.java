package Backend.JobWave.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import Backend.JobWave.Model.Role;

public interface CandidateRepository extends MongoRepository<Role, String> {
    
}
