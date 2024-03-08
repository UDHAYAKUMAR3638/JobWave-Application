package Backend.JobWave.Service;

import org.springframework.stereotype.Service;

import Backend.JobWave.Model.Role;

@Service
public interface RoleService {

    public Role getRole(String role);
}
