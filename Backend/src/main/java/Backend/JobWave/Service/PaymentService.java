package Backend.JobWave.Service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import Backend.JobWave.Model.Payment;
import Backend.JobWave.Model.TransactionDetails;

@Service
public interface PaymentService {

    public TransactionDetails createTransaction(double amount);

    public Payment savePayment(Payment payment);

    public Page<Payment> getBills(String email, int page, int size);

    public Page<Payment> getAllBills(int page, int size);
}
