package Backend.JobWave.Model;

// @Document(collection="transcationDetails")
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionDetails {
    @Id
    private String id;
    private String orderId;
    private String currency;
    private Integer amount;
    private String key;

}
