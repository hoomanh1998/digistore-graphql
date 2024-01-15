import { AbbreviationOfNameParams } from "../ts/types";

export function abbreviationOfName({
  firstName,
  lastName,
}: AbbreviationOfNameParams): string {
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}

export function capitalizedFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function numberWithCommas(x: number | undefined) {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
