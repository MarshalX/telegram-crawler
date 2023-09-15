import { FC, ReactNode, createContext, useMemo, useRef, useState } from 'react';

import { ReactPortal } from 'components/ReactPortal/ReactPortal';

import Snackbar, { SnackRefCurrentProps, SnackbarProps } from './Snackbar';

interface SnackbarContextType {
  showSnackbar: (
    snackbarProps: SnackbarProps & { snackbarId?: string },
  ) => void;
  hideSnackbar: (snackbarId: string) => void;
}

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
  hideSnackbar: () => {},
});

interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
  const currentSnackbarId = useRef<string>();
  const currentSnackbarRef = useRef<SnackRefCurrentProps>(null);
  const [snackbar, setSnackbar] = useState<JSX.Element | null>(null);

  const value = useMemo(() => {
    const context: SnackbarContextType = {
      hideSnackbar: (snackbarId) => {
        if (snackbarId === currentSnackbarId.current) {
          setSnackbar(null);
        }
      },
      showSnackbar: ({ onHide, snackbarId, ...restProps }) => {
        if (snackbarId) {
          if (currentSnackbarId.current === snackbarId) {
            currentSnackbarRef?.current?.shake();
          } else {
            currentSnackbarId.current = snackbarId;
          }
        }
        setSnackbar(
          <Snackbar
            snackbarRef={currentSnackbarRef}
            onHide={() => {
              setSnackbar(null);
              onHide && onHide();
            }}
            {...restProps}
          />,
        );
      },
    };

    return context;
  }, []);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <ReactPortal wrapperId="snackbar-container">{snackbar}</ReactPortal>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
