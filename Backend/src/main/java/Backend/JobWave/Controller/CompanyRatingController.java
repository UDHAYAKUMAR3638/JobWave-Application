package Backend.JobWave.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.result.UpdateResult;

import Backend.JobWave.Model.CompanyRating;
import Backend.JobWave.Model.Recruiter;
import Backend.JobWave.Service.CompanyRatingService;

@RestController
@RequestMapping("/rating")
@CrossOrigin
public class CompanyRatingController {
    
    @Autowired
    CompanyRatingService companyRatingService;

    @PostMapping("/post")
    public ResponseEntity<UpdateResult> addRating(@RequestBody CompanyRating rating){
        CompanyRating updatedRating=companyRatingService.addRating(rating);
        return new ResponseEntity<UpdateResult>(companyRatingService.avgRating(updatedRating.getCompanyId()), HttpStatus.OK);

    }
    
    @PutMapping("/updateRating")
    public void updateRating(@RequestBody Recruiter recruiter){
        companyRatingService.avgRating(recruiter);
    }

    
}
