package Backend.JobWave.Model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Email {
    private String toEmail;
    private String subject;
    private String body;
}
