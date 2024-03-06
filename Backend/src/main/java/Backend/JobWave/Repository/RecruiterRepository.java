package Backend.JobWave.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.Recruiter;

@Repository
public interface RecruiterRepository extends MongoRepository<Recruiter,String> {

    Recruiter findByEmail(String email);

    @Query("{'companyName':/?0/}")
    Page<Recruiter> findByCompanyName(String name, PageRequest pageRequest);
    
}
