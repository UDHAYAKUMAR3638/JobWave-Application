package Backend.JobWave.Service;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Backend.JobWave.Exception.EmailAlreadyExistsException;
import Backend.JobWave.Model.AuthenticationRequest;
import Backend.JobWave.Model.AuthenticationResponse;
import Backend.JobWave.Model.RegisterRequest;
import Backend.JobWave.Model.User;
import Backend.JobWave.Repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final AuthenticationManager authenticationManager;
        private final JwtService jwtService;
        private final RoleService roleService;

 
        public AuthenticationResponse register(RegisterRequest request) {
                User user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(roleService.getRole(request.getRole()))
                                .build();

                System.out.println(request.getRole());

                if (userRepository.existsByEmail(user.getEmail())) {
                        throw new EmailAlreadyExistsException("Email already exists");
                }
                 userRepository.save(user);
                if (request.getRole() == "PATIENT") {
                        // Patient patient = new Patient(user);
                        // patientRepo.save(patient);
                }
                if (request.getRole() == "DOCTOR") {
                        // Doctor doctor = new Doctor(user);
                        // doctorRepo.save(doctor);
                }
                if (request.getRole() == "RECEPTIONIST") {
                        // Doctor doctor = new Doctor(user);
                        // doctorRepo.save(doctor);
                }

                var jwt = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwt)
                                .build();
        }


        public AuthenticationResponse authenticate(AuthenticationRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
                User user =  userRepository.findByEmail(request.getEmail());
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();

        }

}
