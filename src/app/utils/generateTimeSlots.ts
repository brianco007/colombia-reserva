export function generateTimeSlots(): { display: string, value: string }[] {
  const timeSlots: { display: string, value: string }[] = [];
  const startHour = 0; // Start at 00:00
  const endHour = 24;  // End at 24:00

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      // Format display as "h:mm A"
      const hour12 = hour % 12 || 12;
      const period = hour < 12 ? 'AM' : 'PM';
      const hourString12 = hour12.toString();
      const minuteString = minute.toString().padStart(2, '0');
      const displayTime = `${hourString12}:${minuteString} ${period}`;

      // Format value as "HH:mm:ss"
      const hourString24 = hour.toString().padStart(2, '0');
      const valueTime = `${hourString24}:${minuteString}:00`;

      timeSlots.push({ display: displayTime, value: valueTime });
    }
  }

  return timeSlots;
}
