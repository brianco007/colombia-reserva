export default function formatDateTofromISO(dateString: string): string {
  const date = new Date(dateString);
  const monthsInSpanish = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const day = date.getUTCDate();
  const month = monthsInSpanish[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}