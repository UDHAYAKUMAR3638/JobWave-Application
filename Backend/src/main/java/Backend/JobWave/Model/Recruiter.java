package Backend.JobWave.Model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="recruiter")
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
}
