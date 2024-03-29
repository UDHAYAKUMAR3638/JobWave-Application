package Backend.JobWave.Model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "post")
public class Post {
    @Id
    private String _id;
    private String companyName;
    private String role;
    private String location;
    private String salary;
    private String jobType;
    private String schedule;
    private String content;
    private String education;
    private String skills;
    private String benifits;
    private String language;
    private Date date;
    private String status;
    @DocumentReference(collection = "recruiter")
    private Recruiter recruiterId;

    public Post(String id) {
        this._id = id;
    }
}
