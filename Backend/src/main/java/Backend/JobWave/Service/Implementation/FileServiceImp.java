package Backend.JobWave.Service.Implementation;

import java.io.File;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import Backend.JobWave.Service.FileService;
import io.jsonwebtoken.io.IOException;

@Service
public class FileServiceImp implements FileService {
    public String imageConvet(MultipartFile file) throws java.io.IOException {
        if (!file.isEmpty()) {
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
        return "";
    }

    public String pdfConvet(MultipartFile file) throws java.io.IOException {
        String url = "";
        String a = file.getContentType();
        if (a != null && a.endsWith("pdf")) {
            url = "http://localhost:8080/static/resumes/" + file.getOriginalFilename();
            try {
                file.transferTo(new File(
                        "C:/Users/ARULMOZHI K/OneDrive/Documents/Intern/JobWave-Application/Backend/src/main/resources/static/resumes/"
                                + file.getOriginalFilename()));
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
        } else {
            throw new RuntimeException("not pdf type");
        }
        return url;
    }
}
