package Backend.JobWave.Dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JobApplicationDto {
    private String _id;
    private String name;
    private String email;
    private String phoneno;
    private String skills;
    private MultipartFile resume;
    private String experience;
    private String postId;
    private String userId;
    private String status;
}
