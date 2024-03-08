package Backend.JobWave.Service.Implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.JobWave.Model.Role;
import Backend.JobWave.Repository.RoleRepository;
import Backend.JobWave.Service.RoleService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleServiceImp implements RoleService {

    @Autowired
    private RoleRepository roleRepo;

    public Role getRole(String role) {
        return roleRepo.findByRole(role);
    }

}
