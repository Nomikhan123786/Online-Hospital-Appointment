// utils/smartScheduler.js

export const getLeastBusyDoctor = (doctors, appointments) => {
  const doctorLoad = {};

  doctors.forEach(doc => {
    doctorLoad[doc._id] = 0;
  });

  appointments.forEach(app => {
    doctorLoad[app.doctorId] += 1;
  });

  let leastBusy = Object.keys(doctorLoad).reduce((a, b) =>
    doctorLoad[a] < doctorLoad[b] ? a : b
  );

  return leastBusy;
};

// conflict checker
export const isTimeSlotAvailable = (appointments, doctorId, time) => {
  return !appointments.some(
    app => app.doctorId === doctorId && app.time === time
  );
};