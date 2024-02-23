package Backend.JobWave.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collation = "token")
public class Token {

  @Id
  private String _id;

  public String token;

  public String tokenType = "BEARER";

  public Boolean expired;

  public Boolean revoked;

  @DocumentReference(collection = "user")
  public User user;

}
