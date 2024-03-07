package Backend.JobWave.Dao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mongodb.client.result.UpdateResult;

import Backend.JobWave.Model.Recruiter;

@Repository
public class RecruiterDao {
     @Autowired
    MongoTemplate template;

    public UpdateResult updateRecruiter(String id,double rating) {
        Criteria criteria = Criteria.where("_id").is(id);
        Query query = new Query(criteria);
        Update update = new Update().set("rating", rating);
        return template.updateFirst(query, update, Recruiter.class);
    }
}
