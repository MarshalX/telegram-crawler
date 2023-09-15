export const confirm = (text: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (window.Telegram.WebApp.isVersionAtLeast('6.2')) {
      window.Telegram.WebApp.showConfirm(text, (confirmed) => {
        confirmed ? resolve() : reject();
      });
    } else {
      const result = window.confirm(text);
      result ? resolve() : reject();
    }
  });
};
