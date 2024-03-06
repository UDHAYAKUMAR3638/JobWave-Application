package Backend.JobWave.Repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.Jobseeker;

@Repository
public interface JobseekerRepository extends MongoRepository<Jobseeker, String> {

    Jobseeker findByEmail(String email);

    @Query("{$and:[{'headline':/?0/}, {'skills': /?1/},{'location':/?2/}]}")
    Page<Jobseeker> findByheadlineOrskillsAndLocation(String headline, String skills, String location, PageRequest pageRequest);

    @Query("$and:[{'headline':/?0/} ]")
    Page<Jobseeker> findByheadline(String headline, PageRequest pageRequest);

    @Query("{$and:[{'skills':/?0/} ]")
    Page<Jobseeker> findByskills(String skills, PageRequest pageRequest);

    @Query("{$and:[{'location':/?0/} ]")
    Page<Jobseeker> findByLocation(String location, PageRequest pageRequest);

    @Query("{$and:[{'headline':/?0/}, {'skills': /?1/} ]")
    Page<Jobseeker> findByheadlineType(String headline, String skills, PageRequest pageRequest);

    @Query("{$and:[{'headline':/?0/}, {'location': /?1/},{'status':Open}]")
    Page<Jobseeker> findByheadlineLocation(String headline, String location, PageRequest pageRequest);

    @Query("{$and:[{'skills':/?0/}, {'location': /?1/} ]")
    Page<Jobseeker> findByTypeLocation(String skills, String location, PageRequest pageRequest);
    
}
