//FUNCION PARA TRANSFORMAR UN TIMESTAMP A UN STRING FECHA
export function transformTimestampToDate(dateTimestamp) {
  const dateFormat = new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })
  return dateFormat.format(dateTimestamp);
}
