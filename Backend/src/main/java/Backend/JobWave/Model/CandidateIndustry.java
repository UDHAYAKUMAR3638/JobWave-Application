package Backend.JobWave.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="candidateIndustry")
public class CandidateIndustry {
        
        @Id
        private String _id;
        private String industryName;
        private String role;
        private String duration;
    
}
