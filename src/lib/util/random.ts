export function generateRandomNumber() {
  // Generate a random decimal number between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Scale the random decimal to a number between 0 and 99
  const randomNumber = Math.floor(randomDecimal * 100);

  return randomNumber;
}