package Backend.JobWave.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.Post;
@Repository
public interface PostRepository extends MongoRepository<Post,String> {

    
}
