package Backend.JobWave.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.JobWave.Model.Jobseeker;
import Backend.JobWave.Model.User;
import Backend.JobWave.Repository.JobseekerRepository;
import Backend.JobWave.Repository.UserRepository;

@Service
public class JobseekerService {

    @Autowired
    JobseekerRepository jobseekerRepo;
    @Autowired
    UserRepository userRepository;

    public Jobseeker getCandidateDetails(String id) {
        return jobseekerRepo.findById(id).get();
    }

    public Jobseeker registerJobseeker(Jobseeker Jobseeker) {
        userRepository.save(new User(Jobseeker));
        return jobseekerRepo.save(Jobseeker);
    }

    public Jobseeker updateJobseeker(Jobseeker Jobseeker) {
        Jobseeker oldJobseeker=jobseekerRepo.findByEmail(Jobseeker.getEmail());
        if(!Jobseeker.getEmail().equals(oldJobseeker.getEmail()))
        {
            oldJobseeker.setEmail(Jobseeker.getEmail());
        }
        if(!Jobseeker.getDob().equals(oldJobseeker.getDob()))
        {
            oldJobseeker.setDob(Jobseeker.getDob());
        }
        if(!Jobseeker.getHeadline().equals(oldJobseeker.getHeadline()))
        {
            oldJobseeker.setHeadline(Jobseeker.getHeadline());
        }
        if(!Jobseeker.getName().equals(oldJobseeker.getName()))
        {
            oldJobseeker.setName(Jobseeker.getName());
        }
        if(!Jobseeker.getPhoneno().equals(oldJobseeker.getPhoneno()))
        {
            oldJobseeker.setPhoneno(Jobseeker.getPhoneno());
        }
        if(!Jobseeker.getPassword().equals(oldJobseeker.getPassword()))
        {
            oldJobseeker.setPassword(Jobseeker.getPassword());
        }
        if(!Jobseeker.getCollegeName().equals(oldJobseeker.getCollegeName()))
        {
            oldJobseeker.setCollegeName(Jobseeker.getCollegeName());
        }
        if(!Jobseeker.getClgPassedOutYear().equals(oldJobseeker.getClgPassedOutYear()))
        {
            oldJobseeker.setClgPassedOutYear(Jobseeker.getClgPassedOutYear());
        }
        if(!Jobseeker.getLocation().equals(oldJobseeker.getLocation()))
        {
            oldJobseeker.setLocation(Jobseeker.getLocation());
        }
        if(!Jobseeker.getSchoolName().equals(oldJobseeker.getSchoolName()))
        {
            oldJobseeker.setSchoolName(Jobseeker.getSchoolName());
        }
        if(!Jobseeker.getSchlPassedOutYear().equals(oldJobseeker.getSchlPassedOutYear()))
        {
            oldJobseeker.setSchlPassedOutYear(Jobseeker.getSchlPassedOutYear());
        }
        if(!Jobseeker.getCurrentPosition().equals(oldJobseeker.getCurrentPosition()))
        {
            oldJobseeker.setCurrentPosition(Jobseeker.getCurrentPosition());
        }
        return jobseekerRepo.save(oldJobseeker);
    }
}