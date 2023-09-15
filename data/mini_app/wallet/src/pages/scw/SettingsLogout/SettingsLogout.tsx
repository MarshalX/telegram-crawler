import { useSCWAddresses } from 'query/scw/address';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import customPalette from 'customPalette';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { useAppSelector } from 'store';

import { initialState, updateSCW } from 'reducers/scw/scwSlice';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import { Checkmark } from 'components/Checkmark/Checkmark';
import { MainButton } from 'components/MainButton/MainButton';
import { Modal } from 'components/Modal/Modal';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';

import {
  SCWNotificationActions,
  updateAddressNotifications,
} from 'utils/scw/notifications';

import { useModal } from 'hooks/common/useModal';
import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as PassCodeSVG } from 'images/passcode_square.svg';
import { ReactComponent as SupportSquareSVG } from 'images/support_square.svg';

import styles from './SettingsLogout.module.scss';

const TOO_FAST_LOGOUT_TIMEOUT = 5000;

const SettingsScwLogout: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const { themeClassName, theme } = useTheme(styles);
  const navigate = useNavigate();
  const snackbarContext = useContext(SnackbarContext);
  const { raw } = useAppSelector((state) => state.scw);
  const { refetch: refetchSCWAddresses } = useSCWAddresses();

  const [isShown, setIsShown] = useModal();
  const [isUnderstandWhatHappens, setIsUnderstandWhatHappens] = useState(false);
  const [isSavedMnemonic, setIsSavedMnemonic] = useState(false);
  const [isLogOutTooFast, setIsLogOutTooFast] = useState(true);

  const logoutTooFastTimeoutRef = useRef<NodeJS.Timeout>();

  const handleLogout = () => {
    setIsShown(true);
    window.Telegram.WebApp.expand();

    clearTimeout(logoutTooFastTimeoutRef.current);
    logoutTooFastTimeoutRef.current = setTimeout(() => {
      setIsLogOutTooFast(false);
    }, TOO_FAST_LOGOUT_TIMEOUT);
  };

  useEffect(() => {
    return () => {
      clearTimeout(logoutTooFastTimeoutRef.current);
    };
  }, []);

  const handleCloseModal = () => {
    setIsShown(false);
    setIsLogOutTooFast(true);
  };

  const logout = () => {
    updateAddressNotifications(raw, SCWNotificationActions.unregister)
      .then(() => {
        // TODO: Optimize by overriding react-query result locally
        refetchSCWAddresses();
        dispatch(updateSCW(initialState));
        navigate(routePaths.MAIN);
        snackbarContext.showSnackbar({
          icon: 'ton',
          text: t('scw.settings.logged_out_snackbar_text'),
        });
      })
      .catch(() => {
        snackbarContext.showSnackbar({
          icon: 'warning',
          text: t('error.some_technical_issue'),
        });
      });
  };

  const onLogoutClick = () => {
    if (isLogOutTooFast) {
      setIsLogOutTooFast(false);

      window.Telegram.WebApp.showPopup(
        {
          title: t('scw.settings.that_was_quick_title'),
          message: t('scw.settings.that_was_quick_description'),
          buttons: [
            {
              id: 'saved',
              text: t('scw.settings.that_was_quick_saved'),
            },
            {
              id: 'secret',
              text: t('scw.settings.that_was_quick_show_secret'),
            },
          ],
        },
        (id) => {
          setIsShown(false);

          // Settimeout prevents Telegram WebZ from doing nothing
          // Remove when WT-2269 is fixed
          setTimeout(() => {
            switch (id) {
              case 'secret':
                navigate({
                  pathname: routePaths.SCW_SETTINGS,
                  search: createSearchParams({
                    showMnemonic: 'true',
                  }).toString(),
                });
                break;
              case 'saved':
                logout();
                break;
            }
          }, 150);
        },
      );
    } else {
      logout();
    }
  };

  const isLogoutDisabled = !isUnderstandWhatHappens || !isSavedMnemonic;

  return (
    <Page mode={'secondary'}>
      <BackButton />
      {isShown && (
        <Modal
          title={t('scw.settings.logout_modal_title')}
          onClose={handleCloseModal}
        >
          <Section
            apple={{
              fill: 'quaternary',
            }}
          >
            <Cell.List>
              <Cell
                tappable
                onClick={() =>
                  setIsUnderstandWhatHappens(!isUnderstandWhatHappens)
                }
                end={
                  <Cell.Part type="checkbox">
                    <Checkmark
                      mode="checkbox"
                      checked={isUnderstandWhatHappens}
                    />
                  </Cell.Part>
                }
              >
                <Cell.Text title={t('scw.settings.logout_modal_remove_ton')} />
              </Cell>
              <Cell
                tappable
                onClick={() => setIsSavedMnemonic(!isSavedMnemonic)}
                end={
                  <Cell.Part type="checkbox">
                    <Checkmark mode="checkbox" checked={isSavedMnemonic} />
                  </Cell.Part>
                }
              >
                <Cell.Text title={t('scw.settings.logout_modal_save')} />
              </Cell>
            </Cell.List>
          </Section>
          <MainButton
            disabled={isLogoutDisabled}
            onClick={onLogoutClick}
            text={t('scw.settings.logout_modal_action')}
            color={
              isLogoutDisabled
                ? customPalette[theme][colorScheme].button_disabled_color
                : customPalette[theme][colorScheme].button_danger_color
            }
            textColor={
              isLogoutDisabled
                ? customPalette[theme][colorScheme].button_disabled_text_color
                : window.Telegram.WebApp.themeParams.button_text_color
            }
          />
        </Modal>
      )}

      <div className={themeClassName('root')}>
        <Text
          apple={{
            variant: 'title1',
          }}
          material={{
            variant: 'headline5',
          }}
          className={themeClassName('title')}
        >
          {t('scw.settings.remove_ton_space_title')}
        </Text>

        <Section separator>
          <Cell.List>
            <Cell
              chevron
              tappable
              Component={Link}
              to={{
                pathname: routePaths.SCW_SETTINGS,
                search: createSearchParams({
                  showMnemonic: 'true',
                }).toString(),
              }}
              start={
                <Cell.Part type="icon">
                  <PassCodeSVG style={{ width: 30, height: 30 }} />
                </Cell.Part>
              }
            >
              <Cell.Text
                title={t('scw.settings.show_secret_phrase_title')}
                description={t('scw.settings.show_secret_phrase_description')}
                multilineDescription
              />
            </Cell>
            <Cell
              chevron
              tappable
              onClick={() => {
                window.Telegram.WebApp.openTelegramLink(
                  WALLET_SUPPORT_BOT_LINK,
                );
              }}
              start={
                <Cell.Part type="icon">
                  <SupportSquareSVG style={{ width: 30, height: 30 }} />
                </Cell.Part>
              }
            >
              <Cell.Text
                title={t('common.contact_support')}
                description={t('scw.settings.contact_support_description')}
                multilineDescription
              />
            </Cell>
          </Cell.List>
        </Section>
        <Section
          separator
          material={{
            descriptionLayout: 'outer',
          }}
          description={t('scw.settings.logout_description')}
        >
          <Cell.List>
            <Cell onClick={handleLogout} tappable>
              <Cell.Text
                titleAppearance="danger"
                title={t('scw.settings.logout')}
              />
            </Cell>
          </Cell.List>
        </Section>
      </div>
    </Page>
  );
};

export default SettingsScwLogout;
