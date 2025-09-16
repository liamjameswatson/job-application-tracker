// converts date type into dd/mm/yyyy
export function formatDate(timestamp: Date): string {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// takes a string yyyy/mm/dd and turns it to dd/mm/yyyyy
export function formatStringDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
