import { FC, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Collectible as CollectiblePayload } from 'api/getGems/generated';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { useAppSelector } from 'store';

import { Cell } from 'components/Cells';
import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import Tappable from 'components/Tappable/Tappable';
import { Text } from 'components/Text/Text';

import { copyToClipboard, generateTelegramLink } from 'utils/common/common';
import { generateStartAttach } from 'utils/common/startattach';
import { squashAddress } from 'utils/wallet/transactions';

import { useTheme } from 'hooks/utils/useTheme';

import { Media } from '../../../components/Media/Media';
import { Banner } from '../Banner/Banner';
import CollectibleActions from '../CollectibleActions/CollectibleActions';
import CollectibleBadge from '../CollectibleBadge/CollectibleBadge';
import { Group } from '../Group/Group';
import styles from './Collectible.module.scss';
import { ReactComponent as ArrowSvg } from './arrow.svg';
import { ReactComponent as ShareSVG } from './share.svg';

interface CollectibleProps {
  collectible: CollectiblePayload;
}

const Collectible: FC<CollectibleProps> = ({ collectible }) => {
  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const userAddress = useAppSelector((state) => state.scw.address);
  const isUserCollectibleOwner = userAddress === collectible.owner?.address;
  const actions = useMemo(() => {
    return collectible.actions?.filter((action) => {
      return (
        action.displayTo !== 'Owner' ||
        (action.displayTo === 'Owner' && isUserCollectibleOwner)
      );
    });
  }, [collectible.actions, isUserCollectibleOwner]);
  const squashedAddress = squashAddress(collectible.address);

  const snackbarContext = useContext(SnackbarContext);
  const { botUsername } = useAppSelector((state) => state.wallet);
  const onShareClick = () => {
    const collectibleUrl = generateTelegramLink(`${botUsername}/start`, {
      startapp: generateStartAttach(`collectible_${collectible.address}`),
    });

    copyToClipboard(collectibleUrl).then(() => {
      snackbarContext.showSnackbar({
        text: t('collectibles.collectible_page.link_copied_to_clipboard'),
      });
    });
  };

  return (
    <>
      <div className={styles.root}>
        <Group>
          <div className={themeClassName('content')}>
            <Media
              className={styles.contentMedia}
              payload={collectible.content}
            />
            <Banner />
          </div>
          <div className={themeClassName('top')}>
            <div className={themeClassName('topLeft')}>
              {!!collectible.collectionPreview && (
                <Tappable
                  className={themeClassName('collection')}
                  Component="a"
                  target="_blank"
                  href={collectible.collectionPreview.url}
                  rel="noreferrer noopener"
                >
                  <div className={themeClassName('collectionLeft')}>
                    <Media
                      className={themeClassName('collectionMedia')}
                      onlyPreview
                      payload={collectible.collectionPreview.content}
                    />
                  </div>
                  <div className={styles.collectionRight}>
                    <div className={styles.collectionName}>
                      <Text
                        className={styles.collectionNameText}
                        apple={{
                          variant: 'body',
                          weight: 'regular',
                          color: 'text',
                        }}
                        material={{ variant: 'subtitle1', color: 'text' }}
                      >
                        {collectible.collectionPreview.name ||
                          squashAddress(collectible.collectionPreview.address)}
                      </Text>
                      <div className={styles.collectionArrow}>
                        <ArrowSvg />
                      </div>
                    </div>
                  </div>
                </Tappable>
              )}
              <div className={styles.name}>
                <Text
                  apple={{ variant: 'title1', color: 'text' }}
                  material={{
                    variant: 'headline5',
                    color: 'text',
                  }}
                >
                  {collectible.name || squashedAddress}
                </Text>
              </div>
            </div>
            <div className={themeClassName('topRight')}>
              {!!collectible.bagde && (
                <CollectibleBadge payload={collectible.bagde} />
              )}
              <Tappable
                Component="button"
                rootClassName={styles.shareButton}
                onClick={onShareClick}
              >
                <ShareSVG />
              </Tappable>
            </div>
          </div>
          {!!actions && !!actions.length && (
            <div className={themeClassName('actions')}>
              <CollectibleActions
                actions={actions}
                address={collectible.address}
              />
            </div>
          )}
        </Group>
        {!!collectible.description && (
          <Group header={t('collectibles.collectible_page.description')}>
            <div className={themeClassName('description')}>
              <Text
                apple={{ variant: 'callout', weight: 'regular', color: 'text' }}
                material={{ variant: 'subtitle1', color: 'text' }}
              >
                {collectible.description}
              </Text>
            </div>
          </Group>
        )}
        {!!collectible.owner && (
          <Group header={t('collectibles.collectible_page.owner')}>
            <a
              target="_blank"
              href={collectible.owner.url}
              rel="noreferrer noopener"
            >
              <Cell
                tappable
                separator={theme === 'apple'}
                chevron
                start={
                  <Cell.Part type="roundedIcon">
                    <CurrencyLogo
                      className={themeClassName('ownerLogo')}
                      currency={FrontendCryptoCurrencyEnum.Ton}
                    />
                  </Cell.Part>
                }
              >
                <Cell.Text
                  doubledecker
                  bold
                  title={squashAddress(collectible.owner.address)}
                />
              </Cell>
            </a>
          </Group>
        )}
        {!!collectible.attributes && !!collectible.attributes.length && (
          <Group header={t('collectibles.collectible_page.attributes')}>
            <div className={styles.attributes}>
              {collectible.attributes?.map(({ traitType, value }, idx) => {
                return (
                  <Cell title={value} key={`${traitType}_${value}_${idx}`}>
                    <Cell.Text
                      doubledecker
                      inverted
                      description={traitType}
                      title={value || '-'}
                    />
                  </Cell>
                );
              })}
            </div>
          </Group>
        )}
        <Group header={t('collectibles.collectible_page.details')}>
          <Cell.List>
            <a target="_blank" href={collectible.url} rel="noreferrer noopener">
              <Cell chevron tappable>
                <Cell.Text
                  doubledecker
                  inverted
                  description={t(
                    'collectibles.collectible_page.contract_address',
                  )}
                  title={squashedAddress}
                />
              </Cell>
            </a>
            <Cell>
              <Cell.Text
                doubledecker
                inverted
                description={t('collectibles.collectible_page.token')}
                title={collectible.index}
              />
            </Cell>
            <Cell>
              <Cell.Text
                doubledecker
                inverted
                description={t('collectibles.collectible_page.metadata')}
                title={collectible.metadataSourceType}
              />
            </Cell>
          </Cell.List>
        </Group>
      </div>
    </>
  );
};

export default Collectible;
