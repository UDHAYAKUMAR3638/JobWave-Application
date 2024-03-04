package Backend.JobWave.Repository;


import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.Post;
@Repository
public interface PostRepository extends MongoRepository<Post,String> {

    List<Post> findByRecruiterId(ObjectId objectId);

    List<Post> findByStatus(String string);
    
}
