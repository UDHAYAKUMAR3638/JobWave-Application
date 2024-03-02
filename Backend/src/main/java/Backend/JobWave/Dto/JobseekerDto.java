package Backend.JobWave.Dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import Backend.JobWave.Model.JobseekerIndustry;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JobseekerDto {
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
    private MultipartFile image;
}
