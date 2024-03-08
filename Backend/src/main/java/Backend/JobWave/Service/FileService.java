package Backend.JobWave.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FileService {

    public String imageConvet(MultipartFile file) throws java.io.IOException;

    public String pdfConvet(MultipartFile file) throws java.io.IOException;

}
