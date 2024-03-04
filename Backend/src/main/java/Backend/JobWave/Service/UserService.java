package Backend.JobWave.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Backend.JobWave.Dto.UserDto;
import Backend.JobWave.Model.User;
import Backend.JobWave.Repository.RoleRepository;
import Backend.JobWave.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    RoleRepository  roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
   
    public User getEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public User register(UserDto user) {
        return userRepo.save(new User(user, roleRepository.findByRole(user.getRole()),
                passwordEncoder.encode(user.getPassword())));
    }

}
