package Backend.JobWave;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "Backend.JobWave.Repository")
public class JobWaveApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobWaveApplication.class, args);
	}

}
