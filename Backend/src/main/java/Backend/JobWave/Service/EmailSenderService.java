package Backend.JobWave.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import Backend.JobWave.Model.Email;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    public Boolean sendEmail(Email data ) {
        System.out.println("Mail Sent successfully...");
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("udhayakumar@gmail.com");
        message.setTo(data.getToEmail());
        message.setText(data.getBody());
        message.setSubject(data.getSubject());
        mailSender.send(message);
        return true;
    }
}
