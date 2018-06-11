export function getTypeFromId(id) {
  if (id === 4)  { return 'bg-green'; } // TODO find what is that
  if (id === 5 || id === 13) { return 'humidity'; }
  if (id === 14) { return 'light'; }
  if (id === 6 || id === 11 || id === 18) { return 'pv'; }
  if (id === 7 || id === 29)  { return 'noise'; }
  if (id === 8 || id === 9 || id === 21) { return 'networks'; }
  if (id === 12) { return 'temperature'; }
  if (id === 16) { return 'CO'; }
  if (id === 17 || id === 10) { return 'battery'; }
  if (id === 15) { return 'NO2'; }
}
