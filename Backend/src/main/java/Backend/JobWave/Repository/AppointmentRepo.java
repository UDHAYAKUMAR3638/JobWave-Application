package Backend.JobWave.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Backend.JobWave.Model.Appointment;

public interface AppointmentRepo extends JpaRepository<Appointment, Long> {
}
