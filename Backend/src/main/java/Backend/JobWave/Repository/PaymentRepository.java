package Backend.JobWave.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.Payment;

@Repository 
public interface PaymentRepository extends MongoRepository<Payment,String> {

    List<Payment> findByEmail(String email);

    
}
