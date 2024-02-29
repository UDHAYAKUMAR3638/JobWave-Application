package Backend.JobWave.Service;

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
    ImageService imageService;

    public Recruiter getRecruiterDetails(String id) {
        return RecruiterRepo.findById(id).get();
    }

    public Recruiter registerRecruiter(RecruiterDto Recruiter) throws java.io.IOException {
        userRepository.save(new User(Recruiter, roleRepository.findByRole("RECRUITER"),
                passwordEncoder.encode(Recruiter.getPassword())));
        return RecruiterRepo.save(new Recruiter(Recruiter, imageService.imageConvet(Recruiter.getImage())));
    }

    public Recruiter updateRecruiter(Recruiter Recruiter) {
        Recruiter oldRecruiter = RecruiterRepo.findByEmail(Recruiter.getEmail());
        if (!Recruiter.getCompanyName().equals(oldRecruiter.getCompanyName())) {
            oldRecruiter.setCompanyName(Recruiter.getCompanyName());
        }
        if (!(Recruiter.getEmpCount() == oldRecruiter.getEmpCount())) {
            oldRecruiter.setEmpCount(Recruiter.getEmpCount());
        }
        if (!Recruiter.getEmail().equals(oldRecruiter.getEmail())) {
            oldRecruiter.setEmail(Recruiter.getEmail());
        }
        if (!Recruiter.getName().equals(oldRecruiter.getName())) {
            oldRecruiter.setName(Recruiter.getName());
        }
        if (!Recruiter.getPhoneno().equals(oldRecruiter.getPhoneno())) {
            oldRecruiter.setPhoneno(Recruiter.getPhoneno());
        }
        if (!Recruiter.getPassword().equals(oldRecruiter.getPassword())) {
            oldRecruiter.setPassword(Recruiter.getPassword());
        }
        if (!Recruiter.getCompanyType().equals(oldRecruiter.getCompanyType())) {
            oldRecruiter.setCompanyType(Recruiter.getCompanyType());
        }
        if (!Recruiter.getLocation().equals(oldRecruiter.getLocation())) {
            oldRecruiter.setLocation(Recruiter.getLocation());
        }

        return RecruiterRepo.save(oldRecruiter);
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
