package Backend.JobWave.Controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import Backend.JobWave.Dto.RecruiterDto;
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
    
    @PostMapping("/register")
    public ResponseEntity<Recruiter> registerRecruiter(@ModelAttribute RecruiterDto recruiter) throws IOException {
        return ResponseEntity.ok(recruiterService.registerRecruiter(recruiter));
    }

    @PutMapping("/update")
    public ResponseEntity<Recruiter> updateRecruiter(@ModelAttribute RecruiterDto recruiter) throws IOException {
        return ResponseEntity.ok(recruiterService.updateRecruiter(recruiter));
    }

    @PostMapping("/post") 
    public ResponseEntity<Post> postJob(@RequestBody Post post) {
        return ResponseEntity.ok(recruiterService.postJob(post));
    }

    @PutMapping("/update-post") 
    public ResponseEntity<Post> updatePost(@RequestBody Post post) {
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

    @GetMapping("/getEmail/{email}")
    public ResponseEntity<Recruiter> getEmail(@PathVariable String email) {
        return ResponseEntity.ok(recruiterService.getEmail(email));
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Recruiter> getById(@PathVariable String id) {
        return ResponseEntity.ok(recruiterService.getById(id));
    }

    @GetMapping("/getPostSeekers/{id}")
    public ResponseEntity<List<JobApplication>> getPostSeekers(@PathVariable String id) {
        return ResponseEntity.ok(recruiterService.getPostSeekers(id));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Recruiter>> getAll() {
        return ResponseEntity.ok(recruiterService.getAll());
    }

}
