package Backend.JobWave.Service;

import java.io.IOException;
import java.util.List;
import org.springframework.stereotype.Service;

import Backend.JobWave.Dto.JobApplicationDto;
import Backend.JobWave.Dto.JobseekerDto;
import Backend.JobWave.Model.JobApplication;
import Backend.JobWave.Model.Jobseeker;
import Backend.JobWave.Model.JobseekerIndustry;
import Backend.JobWave.Model.Post;

@Service
public interface JobseekerService {

    public Jobseeker getCandidateDetails(String id) ;

     public Jobseeker registerJobseeker(JobseekerDto Jobseeker) throws java.io.IOException ;
 
    public Jobseeker updateJobseeker(JobseekerDto Jobseeker) throws IOException ;

    public Boolean updateJobseekerIndustries(String id,List<JobseekerIndustry> industry) ;

    public JobApplication jobApply(JobApplicationDto jobApplication) throws IOException ;

    public List<Post> myJobs(String email) ;

    public List<Jobseeker> getAll() ;

    public Jobseeker getEmail(String email) ;

    public JobApplication myJobsDetails(Post postId, String email) ;

    public JobApplication updateApplication(JobApplication jobApplication) ;
}
