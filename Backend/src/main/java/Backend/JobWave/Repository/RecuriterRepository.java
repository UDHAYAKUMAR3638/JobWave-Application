package Backend.JobWave.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.Recuriter;

@Repository
public interface RecuriterRepository extends MongoRepository<Recuriter,String> {

    Recuriter findByEmail(String email);

    
}
