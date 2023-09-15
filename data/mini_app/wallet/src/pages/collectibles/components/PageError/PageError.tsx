import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';
import { PagePlaceholder } from 'components/PagePlaceholder/PagePlaceholder';
import styles from 'components/Placeholder/Placeholder.module.scss';
import { Text } from 'components/Text/Text';
import NotFoundUtka from 'components/animations/NotFoundUtkaAnimation/NotFoundUtka';

interface PageErrorProps {
  refetch?: VoidFunction;
}

export const PageError: FC<PageErrorProps> = ({ refetch }) => {
  const { t } = useTranslation();
  return (
    <Page>
      <BackButton />
      <PagePlaceholder
        media={<NotFoundUtka />}
        title={
          <Text
            apple={{ variant: 'body', weight: 'regular' }}
            material={{ variant: 'body', weight: 'regular' }}
            className={styles.title}
          >
            {t('collectibles.page_error.placeholder_title')}
          </Text>
        }
        bottom={
          refetch !== undefined ? (
            <Text
              onClick={refetch}
              apple={{ variant: 'body', weight: 'regular', color: 'link' }}
              material={{ variant: 'body', weight: 'regular', color: 'link' }}
              className={styles.title}
            >
              {t('collectibles.page_error.placeholder_text')}
            </Text>
          ) : undefined
        }
      />
    </Page>
  );
};
