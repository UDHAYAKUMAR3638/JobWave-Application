package Backend.JobWave.Repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.Payment;

@Repository 
public interface PaymentRepository extends MongoRepository<Payment,String> {

    Page<Payment> findByEmail(String email, PageRequest pageRequest);

    
}
