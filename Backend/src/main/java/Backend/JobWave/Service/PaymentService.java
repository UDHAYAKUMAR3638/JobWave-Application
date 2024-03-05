package Backend.JobWave.Service;

import java.util.List;
import org.springframework.stereotype.Service;

import Backend.JobWave.Model.Payment;
import Backend.JobWave.Model.TransactionDetails;

@Service
public interface PaymentService {

    public TransactionDetails createTransaction(double amount) ;

    public Payment savePayment(Payment payment) ;

    public List<Payment> getBills(String email) ;
}
