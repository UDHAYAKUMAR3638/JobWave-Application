package Backend.JobWave.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.User;
@Repository
public interface UserRepository extends MongoRepository<User, Long> {

    User findByEmail(String email);
    // Add custom query methods if needed

    boolean existsByEmail(String email);
}
