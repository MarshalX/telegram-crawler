import classNames from 'classnames';

import { AmountSkeleton } from 'containers/common/Amount/AmountSkeleton';
import OperationInfo from 'containers/common/OperationInfo/OperationInfo';

import { AliasAvatar } from 'components/AliasAvatar/AliasAvatar';
import { ListItemCell } from 'components/Cells/ListItemCell/ListItemCell';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';

import { useTheme } from 'hooks/utils/useTheme';

import stylesFallback from './OfferPageFallback.module.scss';
import styles from './components/OfferForm/OfferForm.module.scss';

const OfferPageFallback = () => {
  const { theme, themeClassName } = useTheme(styles);
  const { themeClassName: fallbackThemeClassName } = useTheme(stylesFallback);

  return (
    <Page>
      <AmountSkeleton
        top={
          <div
            className={classNames(
              fallbackThemeClassName('operationInfoFallbackSkeleton'),
            )}
          >
            <OperationInfo
              operation={
                <div className={styles.skeleton}>
                  <p className={classNames(themeClassName('name'))}></p>
                </div>
              }
              avatar={
                <AliasAvatar size={theme === 'apple' ? 32 : 24} loading />
              }
            />
          </div>
        }
        bottom={
          <div
            className={classNames(
              styles.skeleton,
              fallbackThemeClassName('bottomFallbackSkeleton'),
            )}
          >
            <p className={themeClassName('estimate')}></p>
            <p className={themeClassName('buy')}></p>
          </div>
        }
      />
      <div className={themeClassName('details')}>
        <Section apple={{ fill: 'secondary' }}>
          <div className={styles.skeleton}>
            <ListItemCell
              after={
                <div style={{ width: 101 }} className={styles.listItemAfter} />
              }
            >
              <div style={{ width: 120 }} className={styles.listItemChildren} />
            </ListItemCell>
            <ListItemCell
              after={
                <div style={{ width: 120 }} className={styles.listItemAfter} />
              }
            >
              <div style={{ width: 81 }} className={styles.listItemChildren} />
            </ListItemCell>
            <ListItemCell
              after={
                <div style={{ width: 54 }} className={styles.listItemAfter} />
              }
            >
              <div style={{ width: 101 }} className={styles.listItemChildren} />
            </ListItemCell>
          </div>
        </Section>
      </div>
    </Page>
  );
};

export { OfferPageFallback };
