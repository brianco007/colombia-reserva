import { ScheduleModel } from "../interfaces/scheduleModel";

const daysOfWeek: Record<string, string> = {
  "lunes": "Lunes",
  "martes": "Martes",
  "miércoles": "Miércoles",
  "jueves": "Jueves",
  "viernes": "Viernes",
  "sábado": "Sábado",
  "domingo": "Domingo"
};

function formatTime(time: string) {
  const [hours, minutes] = time.split(':');
  const hourInt = parseInt(hours);
  const suffix = hourInt >= 12 ? 'PM' : 'AM';
  const hourFormatted = hourInt % 12 || 12;
  return `${hourFormatted} ${suffix}`;
}

export default function openingHours(schedule: ScheduleModel[]) {
  // Create an object with all days of the week set to 'Cerrado'
  const fullWeek: { [key: string]: string } = Object.keys(daysOfWeek).reduce((acc, day) => {
    acc[day] = `${daysOfWeek[day]}: Cerrado`;
    return acc;
}, {} as { [key: string]: string });

  // Update the fullWeek object with the provided schedule data
  schedule.forEach(item => {
      const openTimeFormatted = formatTime(item.openTime);
      const closeTimeFormatted = formatTime(item.closeTime);

      if (item.breakStart && item.breakFinish) {
          const breakStartFormatted = formatTime(item.breakStart);
          const breakFinishFormatted = formatTime(item.breakFinish);
          fullWeek[item.day] = `${daysOfWeek[item.day]}: de ${openTimeFormatted} a ${breakStartFormatted} y de ${breakFinishFormatted} a ${closeTimeFormatted}`;
      } else {
          fullWeek[item.day] = `${daysOfWeek[item.day]}: de ${openTimeFormatted} a ${closeTimeFormatted}`;
      }
  });

  // Return an array of formatted schedule for all days of the week
  return Object.values(fullWeek);
}