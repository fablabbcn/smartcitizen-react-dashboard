

export function humidity(value) {
  return value < 100 ? value/100 : 1;
}
