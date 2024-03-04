package Backend.JobWave.Dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;


@Data
public class RecruiterDto {
   
    private String id;
    private String companyName;
    private Integer empCount;
    private String name;
    private String phoneno;
    private String password;
    private String email;
    private String companyType;
    private String location;
    private MultipartFile image;

    public RecruiterDto(UserDto user) {
        this.email=user.getEmail();
        this.name=user.getName();
        this.password=user.getPassword();
    }

}
