package Backend.JobWave.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import Backend.JobWave.Dto.RecruiterDto;
import Backend.JobWave.Model.JobApplication;
import Backend.JobWave.Model.Post;
import Backend.JobWave.Model.Recruiter;

@Service
public interface RecruiterService {

    public Recruiter getRecruiterDetails(String id);

    public Recruiter registerRecruiter(RecruiterDto Recruiter) throws java.io.IOException;

    public Recruiter updateRecruiter(RecruiterDto recruiter) throws IOException;

    Recruiter Recruiter = new Recruiter();

    public Post postJob(Post post);

    public List<Post> getAllPost();

    public Page<Post> getPost(String id,int page,int size);

    public List<JobApplication> getPostSeekers(String id);

    public Recruiter getEmail(String email);

    public Page<Recruiter> getAll(String name,int page,int size);

    public Recruiter getById(String id);

}   
