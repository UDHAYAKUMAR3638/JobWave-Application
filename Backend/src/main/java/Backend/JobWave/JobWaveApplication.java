package Backend.JobWave;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import Backend.JobWave.Service.EmailSenderService;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "Backend.JobWave.Repository")
public class JobWaveApplication {
@Autowired
 private EmailSenderService emailService;
	public static void main(String[] args) {
		SpringApplication.run(JobWaveApplication.class, args);
	}
   @EventListener(ApplicationReadyEvent.class)
    public void sendMail()
    {
        // emailService.sendEmail("udhayakumar1220@gmail.com", "Hello test", "Body");
    }
}
