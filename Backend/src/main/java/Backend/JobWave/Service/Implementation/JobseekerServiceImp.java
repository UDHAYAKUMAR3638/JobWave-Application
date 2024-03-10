package Backend.JobWave.Service.Implementation;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Backend.JobWave.Dao.JobseekerDao;
import Backend.JobWave.Dto.JobApplicationDto;
import Backend.JobWave.Dto.JobseekerDto;
import Backend.JobWave.Model.JobApplication;
import Backend.JobWave.Model.Jobseeker;
import Backend.JobWave.Model.JobseekerIndustry;
import Backend.JobWave.Model.Post;
import Backend.JobWave.Model.User;
import Backend.JobWave.Repository.JobApplicationRepository;
import Backend.JobWave.Repository.JobseekerRepository;
import Backend.JobWave.Repository.PostRepository;
import Backend.JobWave.Repository.RoleRepository;
import Backend.JobWave.Repository.UserRepository;
import Backend.JobWave.Service.JobseekerService;

@Service
public class JobseekerServiceImp implements JobseekerService {

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
    FileServiceImp fileService;
    @Autowired
    JobseekerDao jobseekerDao;

    @Override
    public Jobseeker getCandidateDetails(String id) {
        return jobseekerRepo.findById(id).get();
    }

    @Override
    public Jobseeker registerJobseeker(JobseekerDto Jobseeker) throws java.io.IOException {
        Jobseeker jobseeker = new Jobseeker(Jobseeker, fileService.imageConvet(Jobseeker.getImage()));
        userRepository.save(new User(jobseeker, roleRepository.findByRole("JOBSEEKER"),
                passwordEncoder.encode(Jobseeker.getPassword())));
        return jobseekerRepo.save(jobseeker);
    }

    @Override
    public Jobseeker updateJobseeker(JobseekerDto Jobseeker) throws IOException {
        Jobseeker jobseeker = new Jobseeker();

        if (!Jobseeker.getImage().isEmpty())
            jobseeker = new Jobseeker(Jobseeker, fileService.imageConvet(Jobseeker.getImage()));
        else
            jobseeker = new Jobseeker(Jobseeker, jobseekerRepo.findById(Jobseeker.getId()).get().getImage());
            
        User user = userRepository.findByEmail(jobseekerRepo.findById(Jobseeker.getId()).get().getEmail());
        user.setEmail(jobseeker.getEmail());
        user.setPassword(passwordEncoder.encode(jobseeker.getPassword()));
        user.setName(jobseeker.getName());
        user.setImage(jobseeker.getImage());
        userRepository.save(user);

        return jobseekerRepo.save(jobseeker);

    }

    @Override
    public Boolean updateJobseekerIndustries(String id, List<JobseekerIndustry> industry) {
        jobseekerDao.updateIndustry(id, industry);
        return true;
    }

    @Override
    public JobApplication jobApply(JobApplicationDto jobApplication) throws IOException {
        if (!jobApplication.getResume().isEmpty())
            return jobApplicationRepository
                    .save(new JobApplication(jobApplication, fileService.pdfConvet(jobApplication.getResume())));
        else
            return jobApplicationRepository.save(new JobApplication(jobApplication,
                    jobApplicationRepository.findById(jobApplication.get_id()).get().getResume()));
    }

    @Override
    public Page<JobApplication> myJobs(String email, int page, int size) {
        return jobApplicationRepository.findByEmail(email, PageRequest.of(page, size));
    }

    @Override
    public Page<Jobseeker> getAll(String headline, String skills, String location, int page, int size) {

        if (headline != null && skills != null && location != null)
            return jobseekerRepo.findByheadlineOrskillsAndLocation(headline, skills, location,
                    PageRequest.of(page, size));

        else if (headline != null && skills != null && location == null)
            return jobseekerRepo.findByheadlineType(headline, skills, PageRequest.of(page, size));

        else if (headline != null && skills == null && location != null)
            return jobseekerRepo.findByheadlineLocation(headline, location, PageRequest.of(page, size));

        else if (headline == null && skills != null && location != null)
            return jobseekerRepo.findByTypeLocation(skills, location, PageRequest.of(page, size));

        else if (headline != null)
            return jobseekerRepo.findByheadline(headline, PageRequest.of(page, size));

        else if (skills != null)
            return jobseekerRepo.findByskills(skills, PageRequest.of(page, size));

        else if (location != null)
            return jobseekerRepo.findByLocation(location, PageRequest.of(page, size));

        else
            return jobseekerRepo.findAll(PageRequest.of(page, size));
    }

    @Override
    public Jobseeker getEmail(String email) {
        return jobseekerRepo.findByEmail(email);
    }

    @Override
    public JobApplication myJobsDetails(Post postId, String email) {
        return jobApplicationRepository.findByEmailAndPostId(email, postId);
    }

    @Override
    public JobApplication updateApplication(JobApplication jobApplication) {
        return jobApplicationRepository.save(jobApplication);
    }

    @Override
    public List<JobApplication> getMyJobs(String email) {
        return jobApplicationRepository.findByEmail(email);
    }
}
