import { FC, ReactNode, createContext, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import API from 'api/wallet';

import { updateWarningsVisibility } from 'reducers/warningsVisibility/warningsVisibilitySlice';

import { DollarsModal } from 'containers/wallet/DollarsModal/DollarsModal';

import { ReactPortal } from 'components/ReactPortal/ReactPortal';

interface DollarsModalContextType {
  show: VoidFunction;
  hide: VoidFunction;
}

export const DollarsModalContext = createContext<DollarsModalContextType>({
  show: () => {},
  hide: () => {},
});

export const DollarsModalProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [modalIsShown, setModalIsShown] = useState<boolean>(false);
  const dispatch = useDispatch();

  const value = useMemo<DollarsModalContextType>(() => {
    return {
      hide: () => {
        setModalIsShown(false);
      },
      show: () => {
        window.Telegram.WebApp.expand();
        setModalIsShown(true);
      },
    };
  }, []);

  return (
    <DollarsModalContext.Provider value={value}>
      {children}
      {modalIsShown && (
        <ReactPortal wrapperId="dollars-modal-container">
          <DollarsModal
            onClose={async () => {
              setModalIsShown(false);
              await API.WVSettings.setUserWvSettings({
                display_what_are_dollars: false,
              });
              dispatch(updateWarningsVisibility({ whatAreDollars: false }));
            }}
          />
        </ReactPortal>
      )}
    </DollarsModalContext.Provider>
  );
};
