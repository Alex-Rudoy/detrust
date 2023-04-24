import { roundToThreeSigFigs } from './roundToThreeSigFigs';

const postfixes = ['', 'K', 'M', 'B', 'T'];

export const postfixNumber = (number: number): string => {
  let i = 0;
  while (number >= 1000) {
    number /= 1000;
    i++;
  }
  return roundToThreeSigFigs(number) + postfixes[i];
};
