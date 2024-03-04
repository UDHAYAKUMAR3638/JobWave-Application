package Backend.JobWave.Dto;


import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class UserDto {
 private String _id;
    private String name;
    private String email;
    private String password;
    private String role;
}
