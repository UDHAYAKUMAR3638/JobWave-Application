package Backend.JobWave.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.JobWave.Model.JobApplication;
import Backend.JobWave.Model.Post;
import Backend.JobWave.Model.Recruiter;
import Backend.JobWave.Service.RecruiterService;

@RestController
@RequestMapping("/recruiter")
@CrossOrigin
public class RecruiterController {
    
    @Autowired
    RecruiterService recruiterService;
     @GetMapping("/view")
    public ResponseEntity<String> getRecruiter() {
        return new ResponseEntity<>("Recruiter",HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Recruiter> registerRecruiter(@RequestBody Recruiter recruiter) {
        return ResponseEntity.ok(recruiterService.registerRecruiter(recruiter));
    }

    @PutMapping("/update")
    public ResponseEntity<Recruiter> updateRecruiter(@RequestBody Recruiter recruiter) {
        return ResponseEntity.ok(recruiterService.registerRecruiter(recruiter));
    }

    @PostMapping("/post")
    public ResponseEntity<Post> postJob(@RequestBody Post post) {
        return ResponseEntity.ok(recruiterService.postJob(post));
    }

    @GetMapping("/getAllPost")
    public ResponseEntity<List<Post>> getAllPost() {
        return ResponseEntity.ok(recruiterService.getAllPost());
    }

    @GetMapping("/getPosts/{id}")
    public ResponseEntity<List<Post>> getPost(@PathVariable String id) {
        return ResponseEntity.ok(recruiterService.getPost(id));
    }

    @GetMapping("/getPostSeekers/{id}")
    public ResponseEntity<List<JobApplication>> getPostSeekers(@PathVariable String id) {
        return ResponseEntity.ok(recruiterService.getPostSeekers(id));
    }

}
