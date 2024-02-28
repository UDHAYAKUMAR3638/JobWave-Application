package Backend.JobWave.Model;

import java.util.Collection;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import Backend.JobWave.Dto.RecruiterDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
@Document(collection="user")
public class User implements UserDetails {

    User(){}
    @Id
    private String _id;
    private String name;
    private String email;
    private String password;

    private String role;
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public User(Jobseeker jobseeker,String role,String password) {
        this.setEmail(jobseeker.getEmail());
        this.setName(jobseeker.getName());
        this.setPassword(password);
        this.setRole(role);
    }

    public User(Recruiter recruiter,String role,String password) {
        this.setEmail(recruiter.getEmail());
        this.setName(recruiter.getName());
        this.setPassword(password);
        this.setRole(role);
    }

    public User(RecruiterDto recruiter, String role, String password) {
        this.setEmail(recruiter.getEmail());
        this.setName(recruiter.getName());
        this.setPassword(password);
        this.setRole(role);
    }
}
