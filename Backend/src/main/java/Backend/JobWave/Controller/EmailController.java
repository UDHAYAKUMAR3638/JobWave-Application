package Backend.JobWave.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.JobWave.Model.Email;
import Backend.JobWave.Service.EmailSenderService;

@RestController
@RequestMapping("/email")
@CrossOrigin
public class EmailController {
    @Autowired
    private EmailSenderService emailService;

    @PostMapping("/mail")
    public ResponseEntity<Boolean> sendMail(@RequestBody Email data) {
        return ResponseEntity.ok(emailService.sendEmail(data));
    }

}
