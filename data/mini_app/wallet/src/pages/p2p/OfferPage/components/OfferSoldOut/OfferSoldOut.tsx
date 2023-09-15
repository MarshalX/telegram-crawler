import { useTranslation } from 'react-i18next';

import { BackButton } from 'components/BackButton/BackButton';
import { MainButton } from 'components/MainButton/MainButton';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as SadSmileSVG } from 'images/sad.svg';

import styles from './OfferSoldOut.module.scss';

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

type Props = {
  onBack: () => void;
};

export const OfferSoldOut = ({ onBack }: Props) => {
  const { t } = useTranslation();

  const { themeClassName } = useTheme(styles);

  return (
    <>
      <BackButton onClick={onBack} />
      <div className="container fix_height">
        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.img}>
              <SadSmileSVG />
            </div>
            <div className={themeClassName('title')}>
              {t('p2p.no_more_tradable_assets')}
            </div>
            <div onClick={onBack} className={themeClassName('link')}>
              {t('p2p.select_another_ad')}
            </div>
          </div>
        </div>
        <MainButton
          data-testid="tgcrawl"
          text={t('p2p.offer_page.open_market')}
          color={button_color}
          textColor={button_text_color}
          onClick={onBack}
        />
      </div>
    </>
  );
};
