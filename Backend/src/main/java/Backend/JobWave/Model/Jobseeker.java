package Backend.JobWave.Model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="jobseeker")
public class Jobseeker {
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
    private String skills;
    private List<JobseekerIndustry> indusrties;
    private String location;
}
