package Backend.JobWave.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import Backend.JobWave.Dto.RecruiterDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "recruiter")
public class Recruiter {
    @Id
    private String _id;
    private String companyName;
    private Integer empCount;
    private String name;
    private String phoneno;
    private String password;
    private String email;
    private String companyType;
    private String location;
    private String image;
    private String about;

    public Recruiter(RecruiterDto recruiterDto, String image) {
        this.set_id(recruiterDto.getId());
        this.setCompanyName(recruiterDto.getCompanyName());
        this.setEmpCount(recruiterDto.getEmpCount());
        this.setName(recruiterDto.getName());
        this.setPhoneno(recruiterDto.getPhoneno());
        this.setPassword(recruiterDto.getPassword());
        this.setEmail(recruiterDto.getEmail());
        this.setCompanyType(recruiterDto.getCompanyType());
        this.setLocation(recruiterDto.getLocation());
        this.setImage(image);
        this.setAbout(recruiterDto.getAbout());
    }

    public Recruiter(User user) {
        this.name=user.getName();
        this.email=user.getEmail();
        this.password=user.getPassword();
    }

}
