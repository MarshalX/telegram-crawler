export function hexToRgb({
  hex,
  opacity,
  asArray,
}: {
  hex: string;
  opacity?: number;
  asArray?: boolean;
}) {
  hex = hex.replace('#', '');

  if (hex.length !== 3 && hex.length !== 6) {
    throw new Error('[hexToRgb]: wrong hex format');
  }

  if (opacity && (opacity < 0 || opacity > 1)) {
    throw new Error('[hexToRgb]: opacity is out of [0, 1] range');
  }

  hex =
    hex.length === 3
      ? hex
          .split('')
          .map((item) => `${item}${item}`)
          .join('')
      : hex;

  const rgb = [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4), 16),
  ];

  if (opacity) {
    rgb.push(opacity);
  }

  if (asArray) {
    return rgb;
  }

  return opacity ? `rgba(${rgb.join(',')})` : `rgb(${rgb.join(',')})`;
}
