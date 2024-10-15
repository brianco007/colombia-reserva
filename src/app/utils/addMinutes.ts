export default function addMinutes(dateString: string, minutes: number): string {
  // Parse the date string into a Date object
  const date = new Date(dateString);
  
  // Add the specified number of minutes
  date.setMinutes(date.getMinutes() + minutes);
  
  // Format the Date object to "YYYY-MM-DDTHH:MM:SS"
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutesFormatted = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutesFormatted}:${seconds}`;
}