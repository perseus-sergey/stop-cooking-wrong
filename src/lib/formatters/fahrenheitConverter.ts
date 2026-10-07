export function celsiusToFahrenheit(celsius: number) {
  const fahrenheit = (celsius * 9) / 5 + 32;

  return Math.round(fahrenheit / 5) * 5;
}
