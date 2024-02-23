package Backend.JobWave.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.JobWave.EmailSenderService;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN') ")
public class AdminController {
@Autowired
 private EmailSenderService emailService;
    @PostMapping("/mail")
    public void sendMail()
    {
        emailService.sendEmail("udhayakumar1220@gmail.com", "Hello test", "Body");
    }

    @PostMapping("/post")
    public String post() {
        return "ADMIN::POST";
    }

    @GetMapping("/get")
    public String get() {
        return "ADMIN::GET";
    }

    @PutMapping("/put")
    public String put() {
        return "ADMIN::PUT";
    }

    @DeleteMapping("/delete")
    public String delete() {
        return "ADMIN::DELETE";
    }

}
