import { Trans, useTranslation } from 'react-i18next';

import { useAppSelector } from 'store';

import { AddressWithQR } from 'containers/common/AddressWithQR/AddressWithQR';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as TONSpaceSVG } from 'images/ton_space_circle.svg';

import styles from './QR.module.scss';

const QR = () => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const { address } = useAppSelector((state) => state.scw);

  return (
    <Page mode="secondary" expandOnMount>
      <BackButton />
      <Text
        apple={{ variant: 'title1' }}
        material={{ variant: 'headline5' }}
        className={themeClassName('title')}
      >
        {t('scw.receive_options.title')}
      </Text>
      <Text
        className={themeClassName('text')}
        apple={{ variant: 'body', weight: 'regular' }}
        material={{ variant: 'body', weight: 'regular' }}
      >
        <Trans
          i18nKey="scw.receive_options.text"
          t={t}
          components={[
            <Text
              key="text"
              apple={{ variant: 'body', weight: 'medium' }}
              material={{ variant: 'body', weight: 'medium' }}
              Component="span"
            />,
          ]}
        />
      </Text>
      <AddressWithQR
        className={themeClassName('qr')}
        logo={<TONSpaceSVG style={{ padding: 4 }} />}
        currency="TON"
        address={address}
      />
    </Page>
  );
};

export default QR;
