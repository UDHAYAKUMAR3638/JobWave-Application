package Backend.JobWave.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("{'name':/?0/}")
    Page<User> findAllByName(String key, PageRequest of);
}
