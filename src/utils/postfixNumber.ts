export const postfixNumber = (number: number) => {
  if (number < 1000) {
    return number;
  }
  const postfixes = ['K', 'M', 'B', 'T'];
  let i = 0;
  while (number >= 1000) {
    number /= 1000;
    i++;
  }
  return Math.round(number) + postfixes[i - 1];
};
