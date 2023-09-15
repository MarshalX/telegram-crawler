function calcPrecision(...args: number[]): number {
  return Math.max(
    ...args.map((item) => String(item).split('.')[1]?.length || 0),
  );
}

export function minus(a: number, b: number, precision?: number): number {
  precision = precision ?? calcPrecision(a, b);
  return (
    (Math.round(a * Math.pow(10, precision)) -
      Math.round(b * Math.pow(10, precision))) /
    Math.pow(10, precision)
  );
}

export function plus(a: number, b: number, precision?: number): number {
  precision = precision ?? calcPrecision(a, b);
  return (
    (Math.round(a * Math.pow(10, precision)) +
      Math.round(b * Math.pow(10, precision))) /
    Math.pow(10, precision)
  );
}

export function divide(a: number, b: number, precision?: number): number {
  precision = precision ?? calcPrecision(a, b);
  return (
    Math.round(a * Math.pow(10, precision)) /
    Math.round(b * Math.pow(10, precision))
  );
}

export function multiply(a: number, b: number, precision?: number): number {
  precision = precision ?? calcPrecision(a, b);
  return (
    (Math.round(a * Math.pow(10, precision)) *
      Math.round(b * Math.pow(10, precision))) /
    Math.pow(10, precision * 2)
  );
}

export function floor(value: number, precision?: number): number {
  precision = precision ?? calcPrecision(value);
  return divide(
    Math.floor(multiply(value, Math.pow(10, precision))),
    Math.pow(10, precision),
  );
}
