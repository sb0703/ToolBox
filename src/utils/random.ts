interface RandomOptions {
  length: number;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeLowercase: boolean;
  includeUppercase: boolean;
}

const NUMBERS = "0123456789";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = LOWER.toUpperCase();
const SYMBOLS = "!@#$%^&*()_+-={}[];:<>,.?/";

export function generateRandom(opts: RandomOptions) {
  let source = "";
  if (opts.includeLowercase) source += LOWER;
  if (opts.includeUppercase) source += UPPER;
  if (opts.includeNumbers) source += NUMBERS;
  if (opts.includeSymbols) source += SYMBOLS;
  if (!source) source = LOWER + NUMBERS;
  let output = "";
  for (let i = 0; i < opts.length; i++) {
    const idx = Math.floor(Math.random() * source.length);
    output += source[idx];
  }
  return output;
}
