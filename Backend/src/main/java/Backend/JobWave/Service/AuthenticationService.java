package Backend.JobWave.Service;

import Backend.JobWave.Model.AuthenticationRequest;
import Backend.JobWave.Model.AuthenticationResponse;
import Backend.JobWave.Model.RegisterRequest;

public interface AuthenticationService {

        public AuthenticationResponse register(RegisterRequest request);

        public AuthenticationResponse authenticate(AuthenticationRequest request);

}
