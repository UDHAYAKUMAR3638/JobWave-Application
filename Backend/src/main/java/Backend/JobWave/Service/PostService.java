package Backend.JobWave.Service;


import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import Backend.JobWave.Model.Post;

@Service
public interface PostService {
        public Page<Post> getPost(String role,String jobType,String location,int page,int size);

}
