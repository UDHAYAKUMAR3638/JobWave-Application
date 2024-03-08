package Backend.JobWave.Model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
    private Date dob;
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
        this.set_id(jobseeker.getId());
        this.setName(jobseeker.getName());
        this.setEmail(jobseeker.getEmail());
        this.setPhoneno(jobseeker.getPhoneno());
        try {
            this.setDob((new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss 'GMT'Z (Z)").parse(jobseeker.getDob())));
        } catch (ParseException e) {
            e.printStackTrace();
        }
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

    public Jobseeker(String id) {
        this._id = id;
    }

    public Jobseeker(User user) {
        this.name = user.getName();
        this.email = user.getEmail();
        this.password = user.getPassword();
    }
}
