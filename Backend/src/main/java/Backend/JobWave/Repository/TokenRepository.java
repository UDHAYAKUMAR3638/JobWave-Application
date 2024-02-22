package Backend.JobWave.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import Backend.JobWave.Model.Token;

@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {

  @Query(value = """
      select t from Token t inner join User u\s
      on t.user.id = u.id\s
      where u.id = :id and (t.expired = false or t.revoked = false)\s
      """)
  List<Token> findActiveTokensByUserId(Integer id);

  Optional<Token> findByToken(String token);

  // void saveAll(List<ch.qos.logback.core.subst.Token> validUserTokens);
}
