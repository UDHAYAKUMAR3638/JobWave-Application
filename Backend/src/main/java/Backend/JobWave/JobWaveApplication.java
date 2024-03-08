package Backend.JobWave;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "Backend.JobWave.Repository")
public class JobWaveApplication {
	
	@Autowired
	public static void main(String[] args) {
		SpringApplication.run(JobWaveApplication.class, args);
	}

}
