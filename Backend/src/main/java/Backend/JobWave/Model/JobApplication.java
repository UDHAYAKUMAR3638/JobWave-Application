package Backend.JobWave.Model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "jobApplication")
public class JobApplication {
     @Id
    private String _id;
    private String name;
    private String email;
    private String phoneno;
    private String skills;
    private String resume;
    private String experience;
    @DocumentReference(collection="post")
    private Post postId;
    
}
