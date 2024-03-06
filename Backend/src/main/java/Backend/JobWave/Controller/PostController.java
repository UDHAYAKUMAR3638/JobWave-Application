package Backend.JobWave.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Backend.JobWave.Model.Post;
import Backend.JobWave.Service.PostService;

@RestController
@RequestMapping("/post")
@CrossOrigin
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping("/getPost")
    public ResponseEntity<Page<Post>> getAllPost(@RequestParam(value = "role") String role, @RequestParam(value = "jobType") String jobType,
            @RequestParam(value = "location") String location,@RequestParam(value = "pageIndex") int page,@RequestParam(value = "pageSize") int size) {
        return ResponseEntity.ok(postService.getPost(role, jobType, location,page,size));
    }

}
