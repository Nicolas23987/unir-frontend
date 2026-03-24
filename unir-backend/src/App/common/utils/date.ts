//función para obtener la fecha y hora actual en Ecuador (UTC-5)

export function getEcuadorDate(): Date {
  const now = new Date();

  const offset = -5;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ecuadorTime = new Date(utc + 3600000 * offset);

  return ecuadorTime;
}
