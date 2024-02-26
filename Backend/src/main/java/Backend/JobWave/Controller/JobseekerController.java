package Backend.JobWave.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.JobWave.Model.Jobseeker;
import Backend.JobWave.Service.JobseekerService;

@RestController
@RequestMapping("/jobseeker")
@CrossOrigin
public class JobseekerController {

    @Autowired
    JobseekerService jobseekerService;

    @GetMapping("/view")
    public ResponseEntity<String> getJobseeker() {
        System.out.println(new ResponseEntity<>("jobseeker",HttpStatus.OK));
        return new ResponseEntity<>("jobseeker",HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Jobseeker> registerJobseeker(@RequestBody Jobseeker jobseeker) {
        return ResponseEntity.ok(jobseekerService.registerJobseeker(jobseeker));
    }

    @PutMapping("/update")
    public ResponseEntity<Jobseeker> updateJobseeker(@RequestBody Jobseeker jobseeker) {
        return ResponseEntity.ok(jobseekerService.updateJobseeker(jobseeker));
    }

}
