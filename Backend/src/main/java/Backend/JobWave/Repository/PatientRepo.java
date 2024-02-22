package Backend.JobWave.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Backend.JobWave.Model.Patient;

public interface PatientRepo extends JpaRepository<Patient, Long> {

    Patient findFirstByPatientEmail(String userEmail);
}
