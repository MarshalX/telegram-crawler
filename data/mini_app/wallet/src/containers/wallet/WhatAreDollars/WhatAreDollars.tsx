import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { DollarsModalTrigger } from 'containers/wallet/DollarsModal/DollarsModalTrigger';

import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as QuestionMarkSVG } from 'images/question_mark.svg';

import styles from './WhatAreDollars.module.scss';

export const WhatAreDollars: FC<{
  className?: string;
}> = ({ className }) => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();

  return (
    <DollarsModalTrigger className={className}>
      <div className={themeClassName('root')}>
        <QuestionMarkSVG />
        <Text
          apple={{ variant: 'body', weight: 'regular' }}
          material={{ variant: 'body', weight: 'regular' }}
        >
          {t('common.what_are_dollars')}
        </Text>
      </div>
    </DollarsModalTrigger>
  );
};
