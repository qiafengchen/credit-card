export interface Expiry {
  month: string;
  year: string;
}
export const numericRegex = new RegExp(/^\d+$/);

export function formatCreditCardNumber(value: string): string {
  return `${value.substring(0, 4)} ${value.substring(4, 8)} ${value.substring(
    8,
    12
  )} ${value.substring(12, 16)}`;
}
export function formatDate(value: Expiry): string {
  return `${value.month.length < 2 ? `0${value.month}` : value.month}/${
    value.year.slice(-2) || 2025
  }`;
}
