package Backend.JobWave.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Backend.JobWave.Dto.JobseekerDto;
import Backend.JobWave.Model.JobApplication;
import Backend.JobWave.Model.Jobseeker;
import Backend.JobWave.Model.Post;
import Backend.JobWave.Model.User;
import Backend.JobWave.Repository.JobApplicationRepository;
import Backend.JobWave.Repository.JobseekerRepository;
import Backend.JobWave.Repository.PostRepository;
import Backend.JobWave.Repository.RoleRepository;
import Backend.JobWave.Repository.UserRepository;

@Service
public class JobseekerService {

    @Autowired
    JobseekerRepository jobseekerRepo;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PostRepository postRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JobApplicationRepository jobApplicationRepository;
    @Autowired
    ImageService imageService;

    public Jobseeker getCandidateDetails(String id) {
        return jobseekerRepo.findById(id).get();
    }

     public Jobseeker registerJobseeker(JobseekerDto Jobseeker) throws java.io.IOException {
        userRepository.save(new User(Jobseeker, roleRepository.findByRole("JOBSEEKER"),
                passwordEncoder.encode(Jobseeker.getPassword())));
        return jobseekerRepo.save(new Jobseeker(Jobseeker, imageService.imageConvet(Jobseeker.getImage())));
    }
 
    public Jobseeker updateJobseeker(JobseekerDto Jobseeker) throws IOException {
        if(!Jobseeker.getImage().isEmpty())
        return jobseekerRepo.save(new Jobseeker(Jobseeker, imageService.imageConvet(Jobseeker.getImage())));
        else
        return jobseekerRepo.save(new Jobseeker(Jobseeker,jobseekerRepo.findById(Jobseeker.get_id()).get().getImage()) );
    }

    public JobApplication jobApply(JobApplication jobApplication) {
        return jobApplicationRepository.save(jobApplication);
    }

    public List<Post> myJobs(String email) {
        List<JobApplication> applications = jobApplicationRepository.findByEmail(email);
        List<Post> posts = new ArrayList<>();
        for (JobApplication application : applications) {
            Post post = postRepository.findById(application.getPostId().get_id()).get();
            if (post != null) {
                posts.add(post);
            }
        }
        return posts;
    }

    public List<Jobseeker> getAll() {
        return jobseekerRepo.findAll();
    }

    public Jobseeker getEmail(String email) {
        return jobseekerRepo.findByEmail(email);
    }

    public JobApplication myJobsDetails(Post postId, String email) {
       return jobApplicationRepository.findByEmailAndPostId(email,postId);
    }
}
