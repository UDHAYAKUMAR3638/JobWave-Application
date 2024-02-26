package Backend.JobWave.Model;

import java.util.Collection;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection="user")
public class User implements UserDetails {
    @Id
    private String _id;
    private String name;
    private String email;
    private String password;

    @DocumentReference(collection ="role")
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.getRole()));
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

    public User(Jobseeker jobseeker) {
        this.setEmail(jobseeker.getEmail());
        this.setName(jobseeker.getName());
        this.setPassword(jobseeker.getPassword());
    }
    public User(Recuriter recuriter) {
        this.setEmail(recuriter.getEmail());
        this.setName(recuriter.getName());
        this.setPassword(recuriter.getPassword());
    }
}
