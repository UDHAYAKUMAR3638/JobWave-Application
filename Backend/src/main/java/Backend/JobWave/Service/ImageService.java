package Backend.JobWave.Service;

import java.io.File;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import io.jsonwebtoken.io.IOException;

@Service
public class ImageService {
    public String imageConvet(MultipartFile file) throws java.io.IOException {
        String url = "";
        String a = file.getContentType();
        if (a != null && a.startsWith("image")) {
            url = "http://localhost:8080/static/images/" + file.getOriginalFilename();
            try {
                file.transferTo(new File(
                        "C:/Users/ARULMOZHI K/OneDrive/Documents/Intern/JobWave-Application/Backend/src/main/resources/static/images/"
                                + file.getOriginalFilename()));
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
        } else {
            throw new RuntimeException("not image type");
        }
        return url;
    }
}
