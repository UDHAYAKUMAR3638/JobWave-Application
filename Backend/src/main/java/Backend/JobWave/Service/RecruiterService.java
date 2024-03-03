package Backend.JobWave.Service;

import java.io.IOException;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Backend.JobWave.Dto.RecruiterDto;
import Backend.JobWave.Model.JobApplication;
import Backend.JobWave.Model.Post;
import Backend.JobWave.Model.Recruiter;
import Backend.JobWave.Model.User;
import Backend.JobWave.Repository.JobApplicationRepository;
import Backend.JobWave.Repository.PostRepository;
import Backend.JobWave.Repository.RecruiterRepository;
import Backend.JobWave.Repository.RoleRepository;
import Backend.JobWave.Repository.UserRepository;

@Service
public class RecruiterService {

    @Autowired
    RecruiterRepository RecruiterRepo;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PostRepository postRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JobApplicationRepository jobApplicationRepository;
    @Autowired
    FileService fileService;

    public Recruiter getRecruiterDetails(String id) {
        return RecruiterRepo.findById(id).get();
    }

    public Recruiter registerRecruiter(RecruiterDto Recruiter) throws java.io.IOException {
        userRepository.save(new User(Recruiter, roleRepository.findByRole("RECRUITER"),
                passwordEncoder.encode(Recruiter.getPassword())));
        return RecruiterRepo.save(new Recruiter(Recruiter, fileService.imageConvet(Recruiter.getImage())));
    }

    public Recruiter updateRecruiter(RecruiterDto recruiter) throws IOException {
        User user= userRepository.findByEmail(RecruiterRepo.findById(recruiter.getId()).get().getEmail());
        user.setEmail(recruiter.getEmail());
        user.setPassword(passwordEncoder.encode(recruiter.getPassword()));
        user.setName(recruiter.getName());
        userRepository.save(user);
         if(!recruiter.getImage().isEmpty())
        return RecruiterRepo.save(new Recruiter(recruiter, fileService.imageConvet(recruiter.getImage())));
        else
        return RecruiterRepo.save(new Recruiter(recruiter,RecruiterRepo.findById(recruiter.getId()).get().getImage()) );
    }

    public Post postJob(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPost() {
        return postRepository.findAll();
    }

    public List<Post> getPost(String id) {
        return postRepository.findByRecruiterId(new ObjectId(id));
    }

    public List<JobApplication> getPostSeekers(String id) {
        return jobApplicationRepository.findByPostId(new ObjectId(id));
    }

    public Recruiter getEmail(String email) {
        return RecruiterRepo.findByEmail(email);
    }
}
