package Backend.JobWave.Controller;


import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.JobWave.Dto.JobseekerDto;
import Backend.JobWave.Dto.RecruiterDto;
import Backend.JobWave.Dto.UserDto;
import Backend.JobWave.Model.Jobseeker;
import Backend.JobWave.Model.Recruiter;
import Backend.JobWave.Model.User;
import Backend.JobWave.Service.JobseekerService;
import Backend.JobWave.Service.RecruiterService;
import Backend.JobWave.Service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    JobseekerService JobseekerService;

    @Autowired
    RecruiterService RecruiterService;

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
    public ResponseEntity<User> register(@RequestBody UserDto user) throws IOException {
        return new ResponseEntity<User>(userService.register(user),HttpStatus.OK);
    }
   
}
