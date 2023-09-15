export function setCSSVariable(
  element: HTMLElement,
  name: string,
  value: string,
): void {
  element.style.setProperty(`--${name}`, value);
}

export function isMonochrome() {
  return (
    window.Telegram.WebApp.themeParams.link_color ===
    window.Telegram.WebApp.themeParams.text_color
  );
}
