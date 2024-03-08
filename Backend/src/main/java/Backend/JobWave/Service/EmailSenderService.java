package Backend.JobWave.Service;

import org.springframework.stereotype.Service;

import Backend.JobWave.Model.Email;

@Service
public interface EmailSenderService {
    
    public Boolean sendEmail(Email data);
}
