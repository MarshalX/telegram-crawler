import { FC, useEffect } from 'react';

interface BackButtonProps {
  onClick?: VoidFunction;
}

const backButton = window.Telegram.WebApp.BackButton;

let isButtonShown = false;

export const BackButton: FC<BackButtonProps> = ({
  onClick = () => {
    window.history.back();
  },
}) => {
  const platform = window.Telegram.WebApp.platform;

  useEffect(() => {
    backButton.show();
    isButtonShown = true;
    return () => {
      isButtonShown = false;
      // Мы ждем 10мс на случай, если на следующем экране тоже нужен BackButton.
      // Если через это время isButtonShown не стал true, значит следующему экрану кнопка не нужна и мы её прячем
      // На MacOS этот прием создает проблему с перекрашиванием шапки, поэтому там сразу прячем кнопку
      platform === 'macos'
        ? backButton.hide()
        : setTimeout(() => {
            if (!isButtonShown) {
              backButton.hide();
            }
          }, 10);
    };
  }, []);

  useEffect(() => {
    window.Telegram.WebApp.onEvent('backButtonClicked', onClick);
    return () => {
      window.Telegram.WebApp.offEvent('backButtonClicked', onClick);
    };
  }, [onClick]);

  return null;
};
