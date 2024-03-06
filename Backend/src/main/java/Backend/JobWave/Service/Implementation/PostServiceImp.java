package Backend.JobWave.Service.Implementation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import Backend.JobWave.Model.Post;
import Backend.JobWave.Repository.PostRepository;
import Backend.JobWave.Service.PostService;

@Service
public class PostServiceImp implements PostService {
    @Autowired
    PostRepository postRepository;

    @Override
    public Page<Post> getPost(String role, String jobType, String location,int page,int size) {

        if(role!=null&&jobType!=null&&location!=null)
        return postRepository.findByRoleOrJobTypeAndLocation(role, jobType, location,PageRequest.of(page, size));

        else if(role!=null&&jobType!=null&&location==null)
        return postRepository.findByRoleType(role, jobType,PageRequest.of(page, size));

        else if(role!=null&&jobType==null&&location!=null)
        return postRepository.findByRoleLocation(role, location,PageRequest.of(page, size));

        else if(role==null&&jobType!=null&&location!=null)
        return postRepository.findByTypeLocation(jobType,location,PageRequest.of(page, size));

        else if(role!=null)
        return postRepository.findByRole(role,PageRequest.of(page, size));

         else if(jobType!=null)
        return postRepository.findByJobType(jobType,PageRequest.of(page, size));

        else if(location!=null)
        return postRepository.findByLocation(location,PageRequest.of(page, size));

        else 
        return postRepository.findAll(PageRequest.of(page, size));
    }
}
