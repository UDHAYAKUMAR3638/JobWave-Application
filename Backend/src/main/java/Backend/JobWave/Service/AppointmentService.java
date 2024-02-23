// package Backend.JobWave.Service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import Backend.JobWave.Model.Appointment;
// import Backend.JobWave.Repository.AppointmentRepo;

// @Service
// public class AppointmentService {

//     @Autowired
//     AppointmentRepo appointmentRepo;

//     public void bookAppointment(Appointment appointment) {
//         if (!appointmentRepo.existsById(appointment.appointmentId)) {
//             appointmentRepo.save(appointment);
//         }
//     }

//     public void cancelAppointment(Long Id) {
//         appointmentRepo.deleteById(Id);
//     }
// }
