package Backend.JobWave.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "companyRating")
public class CompanyRating {
    @Id
    private String _id;
    @DocumentReference(collection = "recruiter")
    private Recruiter companyId;
    private String jobseekerEmail;
    private int rating;
}