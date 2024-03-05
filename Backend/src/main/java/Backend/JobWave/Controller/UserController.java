package Backend.JobWave.Controller;


import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Backend.JobWave.Dto.JobseekerDto;
import Backend.JobWave.Dto.RecruiterDto;
import Backend.JobWave.Dto.UserDto;
import Backend.JobWave.Model.Jobseeker;
import Backend.JobWave.Model.Recruiter;
import Backend.JobWave.Model.User;
import Backend.JobWave.Service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    Backend.JobWave.Service.JobseekerService JobseekerService;

    @Autowired
    Backend.JobWave.Service.RecruiterService RecruiterService;

    @GetMapping("/getEmail/{email}")
    public ResponseEntity<?> getEmail(@PathVariable String email) {
        return new ResponseEntity<User>(userService.getEmail(email),HttpStatus.OK);
    }

    @PostMapping("/register/jobseeker")
    public ResponseEntity<Jobseeker> registerJobseeker(@RequestBody UserDto user) throws IOException {
        return new ResponseEntity<Jobseeker>(JobseekerService.registerJobseeker(new JobseekerDto(user)),HttpStatus.OK);
    }

    @PostMapping("/register/recruiter")
    public ResponseEntity<Recruiter> registerRecruiter(@RequestBody UserDto user) throws IOException {
        return new ResponseEntity<Recruiter>(RecruiterService.registerRecruiter(new RecruiterDto(user)),HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@ModelAttribute UserDto user) throws IOException {
        return new ResponseEntity<User>(userService.register(user),HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<User> update(@ModelAttribute UserDto user) throws IOException {
        return new ResponseEntity<User>(userService.update(user),HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<Page<User>> getItems(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size) {
    Page<User> user=userService.getItems(page,size);
    return new ResponseEntity<Page<User>>(user,HttpStatus.OK);
    }

}
