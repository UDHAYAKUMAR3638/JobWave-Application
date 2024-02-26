package Backend.JobWave.Controller;

import java.util.List;

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

import Backend.JobWave.Model.Post;
import Backend.JobWave.Model.Recuriter;
import Backend.JobWave.Service.RecuriterService;

@RestController
@RequestMapping("/recuriter")
@CrossOrigin
public class RecruiterController {
    

    @Autowired
    RecuriterService recuriterService;
     @GetMapping("/view")
    public ResponseEntity<String> getRecuriter() {
        return new ResponseEntity<>("Recuriter",HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Recuriter> registerRecuriter(@RequestBody Recuriter recuriter) {
        return ResponseEntity.ok(recuriterService.registerRecuriter(recuriter));
    }

    @PutMapping("/update")
    public ResponseEntity<Recuriter> updateRecuriter(@RequestBody Recuriter recuriter) {
        return ResponseEntity.ok(recuriterService.updateRecuriter(recuriter));
    }

    @PostMapping("/post")
    public ResponseEntity<Post> postJob(@RequestBody Post post) {
        return ResponseEntity.ok(recuriterService.postJob(post));
    }

    @GetMapping("/getAllPost")
    public ResponseEntity<List<Post>> getAllPost() {
        return ResponseEntity.ok(recuriterService.getAllPost());
    }
}
