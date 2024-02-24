package Backend.JobWave.Controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/candidate")
@PreAuthorize("hasRole('CANDIDATE')")
public class CandidateController {

    @GetMapping("/view")
    public String getCandidate()
    {
         return "candidate";
    }
    
}
