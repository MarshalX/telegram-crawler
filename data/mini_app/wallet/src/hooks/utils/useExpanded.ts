import { useEffect, useState } from 'react';

export const useExpanded = () => {
  const [expanded, setExpanded] = useState(window.Telegram.WebApp.isExpanded);

  useEffect(() => {
    const onViewportChange = ({
      isStateStable,
    }: {
      isStateStable: boolean;
    }) => {
      if (isStateStable) {
        setExpanded(window.Telegram.WebApp.isExpanded);
      }
    };
    window.Telegram.WebApp.onEvent('viewportChanged', onViewportChange);

    return () =>
      window.Telegram.WebApp.offEvent('viewportChanged', onViewportChange);
  }, []);

  return expanded;
};
