package Backend.JobWave.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.JobWave.Model.User;
import Backend.JobWave.Repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    UserRepository userRepo;
    public User getEmail(String email){
     return userRepo.findByEmail(email);
    }
}
