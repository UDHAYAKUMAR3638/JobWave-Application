package Backend.JobWave.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Document(collection= "payment")
public class Payment {
    
 @Id
 private String _id;
 @DocumentReference(collection = "post")
 private Post postId;
 private String paymentId;
 private String orderId;
 private String name;
 private String email;
 private Double amount;
 
}
