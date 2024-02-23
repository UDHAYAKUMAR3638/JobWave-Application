package Backend.JobWave.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.JobWave.Model.Role;
import Backend.JobWave.Repository.RoleRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {
    @Autowired
    private RoleRepository roleRepo;
    public Role getRole(String role) {
        return roleRepo.findByRole(role);
    }

}
