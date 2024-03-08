package Backend.JobWave.Service;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import Backend.JobWave.Dto.UserDto;
import Backend.JobWave.Model.User;

@Service
public interface UserService {

    public User getEmail(String email);

    public User register(UserDto user) throws IOException;

    public User update(UserDto user) throws IOException;

    public Page<User> getItems(String key, int page, int size);

    public Boolean updateStatus(String id, String status);

}
