export function getLinesCountInElement(element: HTMLElement): number {
  const { lineHeight } = window.getComputedStyle(element);
  const height = element.offsetHeight;
  return Math.round(height / parseFloat(lineHeight));
}
