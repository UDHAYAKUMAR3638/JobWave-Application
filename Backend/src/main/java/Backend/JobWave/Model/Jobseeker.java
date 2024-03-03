package Backend.JobWave.Model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import Backend.JobWave.Dto.JobseekerDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "jobseeker")
public class Jobseeker {

    @Id
    private String _id;
    private String name;
    private String email;
    private String phoneno;
    private String dob;
    private String password;
    private String headline;
    private String schoolName;
    private Integer schlPassedOutYear;
    private String collegeName;
    private Integer clgPassedOutYear;
    private String currentPosition;
    private String skills;
    private List<JobseekerIndustry> industries;
    private String location;
    private String image;

    public Jobseeker(JobseekerDto jobseeker, String imageConvet) {
        this.set_id(jobseeker.get_id());
        this.setName(jobseeker.getName());
        this.setEmail(jobseeker.getEmail());
        this.setPhoneno(jobseeker.getPhoneno());
        this.setDob(jobseeker.getDob());
        this.setPassword(jobseeker.getPassword());
        this.setHeadline(jobseeker.getHeadline());
        this.setSchoolName(jobseeker.getSchoolName());
        this.setSchlPassedOutYear(jobseeker.getSchlPassedOutYear());
        this.setCollegeName(jobseeker.getCollegeName());
        this.setClgPassedOutYear(jobseeker.getClgPassedOutYear());
        this.setCurrentPosition(jobseeker.getCurrentPosition());
        this.setSkills(jobseeker.getSkills());
        this.setLocation(jobseeker.getLocation());
        this.setImage(imageConvet);
    }

    public Jobseeker(String id){
        this._id=id;
    }
}
