package Backend.JobWave.Service.Implementation;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import Backend.JobWave.Model.Payment;
import Backend.JobWave.Model.TransactionDetails;
import Backend.JobWave.Repository.PaymentRepository;
import Backend.JobWave.Service.PaymentService;

@Service
@PropertySource("classpath:application.properties")
public class PaymentServiceImp implements PaymentService {
    @Autowired
    PaymentRepository paymentRepository;

    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;

    @Value("${razorpay.currency}")
    private String currency;

    @Value("${razorpay.company.name}")
    private String company;

    @Override
    @Transactional
    public TransactionDetails createTransaction(double amount) {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);

            JSONObject orderRequest = new JSONObject();

            orderRequest.put("amount", amount * 100);
            orderRequest.put("currency", currency);
            orderRequest.put("receipt", "order_rcptid_" + System.currentTimeMillis());
            orderRequest.put("payment_capture", 1);

            Order order = razorpayClient.orders.create(orderRequest);

            Integer receivedamount = order.get("amount");
            int getAmount = receivedamount / 100;
            TransactionDetails transactionDetails = TransactionDetails.builder()
                    .orderId(order.get("id"))
                    .currency(order.get("currency"))
                    .amount(getAmount)
                    .key(apiKey)
                    .build();

            return transactionDetails;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public Page<Payment> getBills(String email, int page, int size) {
        return paymentRepository.findByEmail(email, PageRequest.of(page, size));
    }

    @Override
    public Page<Payment> getAllBills(int page, int size) {
        return paymentRepository.findAll(PageRequest.of(page, size));
    }

}
