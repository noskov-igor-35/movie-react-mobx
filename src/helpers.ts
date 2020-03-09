const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];
 
 // Метод формирующий читаемоую дату из даты пришедшей с БД
export function getStringDateFromSQL(sqlDate: string): string {
  const date: Date = new Date(sqlDate);
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

// Метод формирующий время в понятном человеку формате
export function timeOnTheClock(time: number = 0): string {
  const hours: number = Math.floor(time / 60);
  const minutes: number = time % 60;
  return `${ hours }:${ minutes < 10 ? `0${ minutes }` : minutes }`;
}