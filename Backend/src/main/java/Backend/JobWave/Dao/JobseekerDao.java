package Backend.JobWave.Dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.Jobseeker;
import Backend.JobWave.Model.JobseekerIndustry;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

@Repository
public class JobseekerDao {
    @Autowired
    MongoTemplate template;

    public void updateIndustry(String id, List<JobseekerIndustry> industry) {
        Criteria criteria = Criteria.where("_id").is(id);
        Query query = new Query(criteria);
        Update update = new Update().set("industries", industry);
        template.updateFirst(query, update, Jobseeker.class);
    }


}
