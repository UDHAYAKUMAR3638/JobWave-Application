package Backend.JobWave.Repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.Post;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {

    Page<Post> findByRecruiterId(ObjectId objectId, PageRequest pageRequest);

    List<Post> findByStatus(String string);

    @Query("{$and:[{'role':/?0/}, {'jobType': /?1/},{'location':/?2/}, {'status':Open}]}")
    Page<Post> findByRoleOrJobTypeAndLocation(String role, String jobType, String location, PageRequest pageRequest);

    @Query("$and:[{'role':/?0/}, {'status':Open}]")
    Page<Post> findByRole(String role, PageRequest pageRequest);

    @Query("{$and:[{'jobType':/?0/}, {'status':Open}]")
    Page<Post> findByJobType(String jobType, PageRequest pageRequest);

    @Query("{$and:[{'location':/?0/}, {'status':Open}]")
    Page<Post> findByLocation(String location, PageRequest pageRequest);

    @Query("{$and:[{'role':/?0/}, {'jobType': /?1/}, {'status':Open}]")
    Page<Post> findByRoleType(String role, String jobType, PageRequest pageRequest);

    @Query("{$and:[{'role':/?0/}, {'location': /?1/},{'status':Open}]")
    Page<Post> findByRoleLocation(String role, String location, PageRequest pageRequest);

    @Query("{$and:[{'jobType':/?0/}, {'location': /?1/}, {'status':Open}]")
    Page<Post> findByTypeLocation(String jobType, String location, PageRequest pageRequest);

}
