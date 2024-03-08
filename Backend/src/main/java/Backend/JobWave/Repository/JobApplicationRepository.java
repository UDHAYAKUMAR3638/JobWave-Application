package Backend.JobWave.Repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.JobApplication;
import Backend.JobWave.Model.Post;

@Repository
public interface JobApplicationRepository extends MongoRepository<JobApplication, String> {

        List<JobApplication> findByPostId(ObjectId objectId);

        Page<JobApplication> findByEmail(String email, PageRequest pageRequest);

        JobApplication findByEmailAndPostId(String email, Post postId);

        List<JobApplication> findByEmail(String email);

} 
