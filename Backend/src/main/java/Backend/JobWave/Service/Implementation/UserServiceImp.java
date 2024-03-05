package Backend.JobWave.Service.Implementation;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Backend.JobWave.Dto.UserDto;
import Backend.JobWave.Model.User;
import Backend.JobWave.Repository.RoleRepository;
import Backend.JobWave.Repository.UserRepository;
import Backend.JobWave.Service.UserService;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    RoleRepository  roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    FileServiceImp fileService;
   
    public User getEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public User register(UserDto user) throws IOException {
        System.out.println(user);
        return userRepo.save(new User(user, roleRepository.findByRole(user.getRole()),
                passwordEncoder.encode(user.getPassword()),fileService.imageConvet(user.getImage())));
    }

    public User update(UserDto user) throws IOException{
        User newUser=userRepo.findById(user.get_id()).get();
        newUser.setEmail(user.getEmail());
        newUser.setName(user.getName());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setImage((!user.getImage().isEmpty())?fileService.imageConvet(user.getImage()):userRepo.findById(user.get_id()).get().getImage());
        return userRepo.save(newUser);
    }
    public Page<User> getItems(int page, int size){
        return userRepo.findAll(PageRequest.of(page, size));
    }   

}
