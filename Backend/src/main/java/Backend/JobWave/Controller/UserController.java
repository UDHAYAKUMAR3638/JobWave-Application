package Backend.JobWave.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.JobWave.Model.User;
import Backend.JobWave.Service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

@Autowired
UserService userService;

    @GetMapping("/getEmail/{email}")
    public ResponseEntity<?> getEmail(@PathVariable String email) {
        return new ResponseEntity<User>(userService.getEmail(email),HttpStatus.OK);
    }

}
