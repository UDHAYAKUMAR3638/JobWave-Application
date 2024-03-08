package Backend.JobWave.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Backend.JobWave.Model.Payment;
import Backend.JobWave.Model.TransactionDetails;
import Backend.JobWave.Service.PaymentService;

@RestController
@RequestMapping("/payment")
@CrossOrigin
public class PaymentContoller {
    @Autowired
    PaymentService paymentService;

    @GetMapping("/createTransaction/{amount}")
    public ResponseEntity<TransactionDetails> createTransaction(@PathVariable double amount) {
        try {
            TransactionDetails response = paymentService.createTransaction(amount);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/bills")
    public ResponseEntity<Page<Payment>> getBills(@RequestParam(value = "email") String email,
            @RequestParam(value = "pageIndex") int page, @RequestParam(value = "pageSize") int size) {
        return new ResponseEntity<Page<Payment>>(paymentService.getBills(email, page, size), HttpStatus.OK);
    }

    @GetMapping("/getAllBills")
    public ResponseEntity<Page<Payment>> getAllBills(@RequestParam(value = "pageIndex") int page,
            @RequestParam(value = "pageSize") int size) {
        return new ResponseEntity<Page<Payment>>(paymentService.getAllBills(page, size), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Payment> savePayment(@RequestBody Payment payment) {
        try {
            Payment response = paymentService.savePayment(payment);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
