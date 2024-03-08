package Backend.JobWave.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import Backend.JobWave.Dto.JobApplicationDto;
import Backend.JobWave.Dto.JobseekerDto;
import Backend.JobWave.Model.JobApplication;
import Backend.JobWave.Model.Jobseeker;
import Backend.JobWave.Model.JobseekerIndustry;
import Backend.JobWave.Model.Post;

@Service
public interface JobseekerService {

    public Jobseeker getCandidateDetails(String id);

    public Jobseeker registerJobseeker(JobseekerDto Jobseeker) throws java.io.IOException;

    public Jobseeker updateJobseeker(JobseekerDto Jobseeker) throws IOException;

    public Boolean updateJobseekerIndustries(String id, List<JobseekerIndustry> industry);

    public JobApplication jobApply(JobApplicationDto jobApplication) throws IOException;

    public Page<JobApplication> myJobs(String email, int page, int size);

    public Page<Jobseeker> getAll(String headline, String skills, String location, int page, int size);

    public Jobseeker getEmail(String email);

    public JobApplication myJobsDetails(Post postId, String email);

    public JobApplication updateApplication(JobApplication jobApplication);

    public List<JobApplication> getMyJobs(String email);
}
