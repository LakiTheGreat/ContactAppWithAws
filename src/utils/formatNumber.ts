import numeral from "numeral";

export function fData(number: string | number) {
  return numeral(number).format("0 b");
}
