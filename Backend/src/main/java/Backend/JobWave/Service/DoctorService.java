package Backend.JobWave.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.JobWave.Model.Appointment;
import Backend.JobWave.Model.Doctor;
import Backend.JobWave.Repository.DoctorRepo;

@Service
public class DoctorService {

    @Autowired
    DoctorRepo doctorRepo;

    public List<Doctor> getAllDoctors() {
        return doctorRepo.findAll();
    }

    public void addDoctor(Doctor doctor) {
        doctorRepo.save(doctor);
    }

    public List<Appointment> getMyAppointments(Long docId) {
        Doctor myDoc = doctorRepo.findByDoctorId(docId);
        if (myDoc == null) {
            throw new IllegalStateException("The doctor does not exist");
        }
        return myDoc.getAppointments();
    }
}