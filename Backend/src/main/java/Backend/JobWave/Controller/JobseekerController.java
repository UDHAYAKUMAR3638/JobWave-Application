package Backend.JobWave.Controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.JobWave.Dto.JobApplicationDto;
import Backend.JobWave.Dto.JobseekerDto;
import Backend.JobWave.Model.JobApplication;
import Backend.JobWave.Model.Jobseeker;
import Backend.JobWave.Model.JobseekerIndustry;
import Backend.JobWave.Model.Post;
import Backend.JobWave.Service.JobseekerService;

@RestController
@RequestMapping("/jobseeker")
@CrossOrigin
public class JobseekerController {

    @Autowired
    JobseekerService jobseekerService;

    @GetMapping("/view")
    public ResponseEntity<String> getJobseeker() {
        return new ResponseEntity<>("jobseeker", HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Jobseeker>> getAll() {
        return ResponseEntity.ok(jobseekerService.getAll());
    }

    @PostMapping("/register")
    public ResponseEntity<Jobseeker> registerJobseeker(@ModelAttribute JobseekerDto jobseeker) throws IOException {
        return ResponseEntity.ok(jobseekerService.registerJobseeker(jobseeker));
    }

    @PostMapping("/apply")
    public ResponseEntity<JobApplication> jobApply(@ModelAttribute JobApplicationDto jobApplication)
            throws IOException {
        return ResponseEntity.ok(jobseekerService.jobApply(jobApplication));
    }

    @PutMapping("/update-application")
    public ResponseEntity<JobApplication> updateApplication(@RequestBody JobApplication jobApplication) {
        return ResponseEntity.ok(jobseekerService.updateApplication(jobApplication));
    }

    @GetMapping("/myJobs/{email}")
    public ResponseEntity<List<Post>> myJobs(@PathVariable String email) {
        return ResponseEntity.ok(jobseekerService.myJobs(email));
    }

    @GetMapping("/myJobs/{postId}/{email}")
    public ResponseEntity<JobApplication> myJobs(@PathVariable String postId, @PathVariable String email) {
        return ResponseEntity.ok(jobseekerService.myJobsDetails(new Post(postId), email));
    }

    @GetMapping("/getEmail/{email}")
    public ResponseEntity<Jobseeker> getEmail(@PathVariable String email) {
        Jobseeker job = jobseekerService.getEmail(email);
        return ResponseEntity.ok(job);
    }

    @PutMapping("/update")
    public ResponseEntity<Jobseeker> updateJobseeker(@ModelAttribute JobseekerDto jobseeker) throws IOException {
        System.out.println(jobseeker);
        return ResponseEntity.ok(jobseekerService.updateJobseeker(jobseeker));
    }

    @PutMapping("/update-industry/{id}")
    public ResponseEntity<Boolean> updateJobseekerIndustries(@PathVariable String id,
            @RequestBody List<JobseekerIndustry> industry) throws IOException {
        return ResponseEntity.ok(jobseekerService.updateJobseekerIndustries(id, industry));
    }

}
