package Backend.JobWave.Dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.User;

@Repository
public class UserDao {
    @Autowired
    MongoTemplate template;

    public Boolean updateStatus(String id, String status) {
        Criteria criteria = Criteria.where("_id").is(id);
        Query query = new Query(criteria);
        Update update = new Update().set("status", status);
        template.updateFirst(query, update, User.class);
        return true;
    }
}
