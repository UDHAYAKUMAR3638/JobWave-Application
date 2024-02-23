package Backend.JobWave.Auth;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import Backend.JobWave.Exception.EmailAlreadyExistsException;
// import Backend.JobWave.Model.Doctor;
// import Backend.JobWave.Model.Patient;
import Backend.JobWave.Model.Role;
import Backend.JobWave.Model.Token;
import Backend.JobWave.Model.TokenType;
import Backend.JobWave.Model.User;
// import Backend.JobWave.Repository.DoctorRepo;
// import Backend.JobWave.Repository.PatientRepo;
import Backend.JobWave.Repository.TokenRepository;
import Backend.JobWave.Repository.UserRepository;
import Backend.JobWave.Service.JwtService;
import Backend.JobWave.Service.RoleService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

        private final UserRepository userRepository;
        private final TokenRepository tokenRepository;
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
                User savedUser = userRepository.save(user);
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
                saveUserToken(savedUser, jwt);
                return AuthenticationResponse.builder()
                                .token(jwt)
                                .build();
        }

        // private void revokeAllUserTokens(User user) {
        //         List<Token> validUserTokens = tokenRepository.findActiveTokensByUser_id(user.get_id());

        //         if (validUserTokens.isEmpty()) {
        //                 return;
        //         }

        //         validUserTokens.forEach(
        //                         t -> {
        //                                 t.setExpired(true);
        //                                 t.setRevoked(true);
        //                         });
        //         tokenRepository.saveAll(validUserTokens);
        // }

        private void saveUserToken(User user, String token) {
                var usertoken = Token.builder()
                                .user(user)
                                .token(token)
                                .tokenType("BEARER")
                                .build();
                tokenRepository.save(usertoken);
        }

        public AuthenticationResponse authenticate(AuthenticationRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
                User user =  userRepository.findByEmail(request.getEmail());
                var jwtToken = jwtService.generateToken(user);
                saveUserToken(user, jwtToken);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();

        }

}
