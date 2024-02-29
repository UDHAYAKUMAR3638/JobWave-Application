package Backend.JobWave.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.JobWave.Service.EmailSenderService;

@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    private EmailSenderService emailService;

    @PostMapping("/mail")
    public void sendMail() {
        emailService.sendEmail("udhayakumar1220@gmail.com", "Hello test", "Body");
    }

}
