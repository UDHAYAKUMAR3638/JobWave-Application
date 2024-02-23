package Backend.JobWave.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.Role;
@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    @Query("{ 'role' : ?0 }")
    Role findByRole(String role);
}
