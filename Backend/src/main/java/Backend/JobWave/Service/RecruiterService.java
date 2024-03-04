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
    RecruiterRepository recruiterRepo;
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
        return recruiterRepo.findById(id).get();
    }

    public Recruiter registerRecruiter(RecruiterDto Recruiter) throws java.io.IOException {
        Recruiter recruiter=new Recruiter(Recruiter, fileService.imageConvet(Recruiter.getImage()));
        userRepository.save(new User(recruiter, roleRepository.findByRole("RECRUITER"),
                passwordEncoder.encode(Recruiter.getPassword())));
        return recruiterRepo.save(recruiter);
    }

    public Recruiter updateRecruiter(RecruiterDto recruiter) throws IOException {
        Recruiter Recruiter=new Recruiter();
    
        if(!recruiter.getImage().isEmpty())
        Recruiter=new Recruiter(recruiter, fileService.imageConvet(recruiter.getImage()));
        else
        Recruiter=new Recruiter(recruiter,recruiterRepo.findById(recruiter.getId()).get().getImage());
        
        User user= userRepository.findByEmail(recruiterRepo.findById(Recruiter.get_id()).get().getEmail());
        user.setEmail(Recruiter.getEmail());
        user.setPassword(passwordEncoder.encode(Recruiter.getPassword()));
        user.setName(Recruiter.getName());
        user.setImage(Recruiter.getImage());
        userRepository.save(user);
       
        return recruiterRepo.save(Recruiter);
        
    }

    public Post postJob(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPost() {
        return postRepository.findByStatus("Open");
    }

    public List<Post> getPost(String id) {
        return postRepository.findByRecruiterId(new ObjectId(id));
    }

    public List<JobApplication> getPostSeekers(String id) {
        return jobApplicationRepository.findByPostId(new ObjectId(id));
    }

    public Recruiter getEmail(String email) {
        return recruiterRepo.findByEmail(email);
    }

    public List<Recruiter>getAll() {
        return  recruiterRepo.findAll();
    }

    public Recruiter getById(String id) {
        return recruiterRepo.findById(id).get();
    }
}
