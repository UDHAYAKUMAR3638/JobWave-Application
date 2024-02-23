package Backend.JobWave.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.Token;

@Repository
public interface TokenRepository extends MongoRepository<Token, Integer> {

  Optional<Token> findByToken(String token);

  // List<Token> findActiveTokensByUser_id(String _id);

  // void saveAll(List<ch.qos.logback.core.subst.Token> validUserTokens);
}
