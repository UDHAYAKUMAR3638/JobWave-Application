package Backend.JobWave.Model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="candidate")
public class Candidate {
    @Id
    private String _id;
    private String name;
    private String email;
    private String phoneno;
    private Date dob;
    private String password;
    private String headline;
    private String schoolName;
    private Integer schlPassedOutYear;
    private String collegeName;
    private Integer clgPassedOutYear;
    private String currentPosition;
    @DocumentReference(collection ="candidateIndustry")
    private List<CandidateIndustry> indusrties;
    private String location;
}
