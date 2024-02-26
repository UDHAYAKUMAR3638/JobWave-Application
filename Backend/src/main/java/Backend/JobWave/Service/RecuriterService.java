package Backend.JobWave.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.JobWave.Model.Post;
import Backend.JobWave.Model.Recuriter;
import Backend.JobWave.Model.User;
import Backend.JobWave.Repository.PostRepository;
import Backend.JobWave.Repository.RecuriterRepository;
import Backend.JobWave.Repository.UserRepository;

@Service
public class RecuriterService {

    @Autowired
    RecuriterRepository recuriterRepo;
    @Autowired
    UserRepository userRepository;
   @Autowired
   PostRepository postRepository;

    public Recuriter getRecuriterDetails(String id) {
        return recuriterRepo.findById(id).get();
    }

    public Recuriter registerRecuriter(Recuriter Recuriter) {
        userRepository.save(new User(Recuriter));
        return recuriterRepo.save(Recuriter);
    }

    public Recuriter updateRecuriter(Recuriter Recuriter) {
        Recuriter oldRecuriter = recuriterRepo.findByEmail(Recuriter.getEmail());
        if (!Recuriter.getCompanyName().equals(oldRecuriter.getCompanyName())) {
            oldRecuriter.setCompanyName(Recuriter.getCompanyName());
        }
        if (!(Recuriter.getEmpCount() == oldRecuriter.getEmpCount())) {
            oldRecuriter.setEmpCount(Recuriter.getEmpCount());
        }
        if (!Recuriter.getEmail().equals(oldRecuriter.getEmail())) {
            oldRecuriter.setEmail(Recuriter.getEmail());
        }
        if (!Recuriter.getName().equals(oldRecuriter.getName())) {
            oldRecuriter.setName(Recuriter.getName());
        }
        if (!Recuriter.getPhoneno().equals(oldRecuriter.getPhoneno())) {
            oldRecuriter.setPhoneno(Recuriter.getPhoneno());
        }
        if (!Recuriter.getPassword().equals(oldRecuriter.getPassword())) {
            oldRecuriter.setPassword(Recuriter.getPassword());
        }
        if (!Recuriter.getCompanyType().equals(oldRecuriter.getCompanyType())) {
            oldRecuriter.setCompanyType(Recuriter.getCompanyType());
        }
        if (!Recuriter.getLocation().equals(oldRecuriter.getLocation())) {
            oldRecuriter.setLocation(Recuriter.getLocation());
        }

        return recuriterRepo.save(oldRecuriter);
    }

    public Post postJob(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPost() {
        return postRepository.findAll();
    }
}
