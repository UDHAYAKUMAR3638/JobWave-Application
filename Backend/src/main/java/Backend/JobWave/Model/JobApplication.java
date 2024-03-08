package Backend.JobWave.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import Backend.JobWave.Dto.JobApplicationDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "jobApplication")
public class JobApplication {

    @Id
    private String _id;
    private String name;
    private String email;
    private String phoneno;
    private String skills;
    private String resume;
    private String experience;
    @DocumentReference(collection = "post")
    private Post postId;
    @DocumentReference(collection = "jobseeker")
    private Jobseeker userId;
    private String status;

    public JobApplication(JobApplicationDto jobApplication, String imageConvet) {
        this.set_id(jobApplication.get_id());
        this.setName(jobApplication.getName());
        this.setEmail(jobApplication.getEmail());
        this.setPhoneno(jobApplication.getPhoneno());
        this.setSkills(jobApplication.getSkills());
        this.setResume(imageConvet);
        this.setExperience(jobApplication.getExperience());
        this.setPostId(new Post(jobApplication.getPostId()));
        this.setUserId(new Jobseeker(jobApplication.getUserId()));
        this.setStatus(jobApplication.getStatus());
    }
}
