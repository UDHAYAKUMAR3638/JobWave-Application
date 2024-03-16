package Backend.JobWave.Service.Implementation;

import java.io.IOException;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Backend.JobWave.Dto.RecruiterDto;
import Backend.JobWave.Exception.EmailAlreadyExistsException;
import Backend.JobWave.Model.JobApplication;
import Backend.JobWave.Model.Post;
import Backend.JobWave.Model.Recruiter;
import Backend.JobWave.Model.User;
import Backend.JobWave.Repository.JobApplicationRepository;
import Backend.JobWave.Repository.PostRepository;
import Backend.JobWave.Repository.RecruiterRepository;
import Backend.JobWave.Repository.RoleRepository;
import Backend.JobWave.Repository.UserRepository;
import Backend.JobWave.Service.RecruiterService;

@Service
public class RecruiterServiceImp implements RecruiterService {

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
    FileServiceImp fileService;

    @Override
    public Recruiter getRecruiterDetails(String id) {
        return recruiterRepo.findById(id).get();
    }

    @Override
    public Recruiter registerRecruiter(RecruiterDto Recruiter) throws java.io.IOException {
        try {
            if (userRepository.findByEmail(Recruiter.getEmail()) == null) {
                Recruiter recruiter = new Recruiter(Recruiter, fileService.imageConvet(Recruiter.getImage()));
                userRepository.save(new User(recruiter, roleRepository.findByRole("RECRUITER"),
                        passwordEncoder.encode(Recruiter.getPassword())));
                return recruiterRepo.save(recruiter);
            } else
                throw new EmailAlreadyExistsException(null);
        } catch (Exception e) {
            throw new EmailAlreadyExistsException("Try another email");
        }
    }

    @Override
    public Recruiter updateRecruiter(RecruiterDto recruiter) throws IOException {
        Recruiter Recruiter = new Recruiter();

        if (!recruiter.getImage().isEmpty())
            Recruiter = new Recruiter(recruiter, fileService.imageConvet(recruiter.getImage()));
        else
            Recruiter = new Recruiter(recruiter, recruiterRepo.findById(recruiter.getId()).get().getImage());

        User user = userRepository.findByEmail(recruiterRepo.findById(Recruiter.get_id()).get().getEmail());
        user.setEmail(Recruiter.getEmail());
        user.setPassword(passwordEncoder.encode(Recruiter.getPassword()));
        user.setName(Recruiter.getName());
        user.setImage(Recruiter.getImage());
        userRepository.save(user);

        return recruiterRepo.save(Recruiter);

    }

    @Override
    public Post postJob(Post post) {
        return postRepository.save(post);
    }

    @Override
    public List<Post> getAllPost() {
        return postRepository.findByStatus("Open");
    }

    @Override
    public Page<Post> getPost(String id, int page, int size) {
        return postRepository.findByRecruiterId(new ObjectId(id), PageRequest.of(page, size));
    }

    @Override
    public List<JobApplication> getPostSeekers(String id) {
        return jobApplicationRepository.findByPostId(new ObjectId(id));
    }

    @Override
    public Recruiter getEmail(String email) {
        return recruiterRepo.findByEmail(email);
    }

    @Override
    public Page<Recruiter> getAll(String name, int page, int size) {
        return recruiterRepo.findByCompanyName(name, PageRequest.of(page, size, Sort.by(Order.desc("rating"))));
    }

    @Override
    public Recruiter getById(String id) {
        return recruiterRepo.findById(id).get();
    }

}
