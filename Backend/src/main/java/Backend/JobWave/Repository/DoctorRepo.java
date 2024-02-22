package Backend.JobWave.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Backend.JobWave.Model.Doctor;

public interface DoctorRepo extends JpaRepository<Doctor, Long> {

    Doctor findByDoctorId(Long docId);
}
