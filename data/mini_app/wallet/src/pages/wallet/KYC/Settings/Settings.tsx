import classNames from 'classnames';
import { useKycLimits } from 'query/wallet/kyc/useKycLimits';
import { useKycStatus } from 'query/wallet/kyc/useKycStatus';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ByLevel } from 'api/p2p/generated-userservice';

import routePaths from 'routePaths';

import { RootState } from 'store';

import { updateKyc } from 'reducers/kyc/kycSlice';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import { InlineLayout } from 'components/InlineLayout/InlineLayout';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';
import SegmentedControl from 'components/SegmentedControl/SegmentedControl';
import { Tabs } from 'components/Tabs/Tabs';
import { Text } from 'components/Text/Text';

import { printFiatAmount } from 'utils/common/currency';
import { kycLevels, limitsKycLevels } from 'utils/common/kyc';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Settings.module.scss';

const Settings = () => {
  const { t } = useTranslation();
  const { limits, currency } = useKycLimits();
  const tabsRef = useRef<HTMLDivElement[]>([]);
  const { kycStatus } = useKycStatus();
  const { languageCode } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { themeClassName, theme } = useTheme(styles);
  const [searchParams] = useSearchParams();

  const backPath = searchParams.get('backPath');

  const tabs = kycLevels.map((item) => t(`kyc.settings.${item}`));

  const [activeIndex, setActiveIndex] = useState(0);

  const selectedIndex = useMemo(() => {
    return kycLevels.findIndex((item) => item === kycStatus?.level);
  }, [kycStatus]);

  const mainButtonText =
    activeIndex <= selectedIndex
      ? t('kyc.settings.more')
      : t('kyc.settings.continue');

  const handleClick = () => {
    if (activeIndex <= selectedIndex) {
      setActiveIndex(selectedIndex + 1);
    } else {
      dispatch(
        updateKyc({
          nextLevel: kycLevels[activeIndex],
        }),
      );

      navigate(routePaths.KYC_CONFIRMATION);
    }
  };

  useEffect(() => {
    const displayedKycLevel = searchParams.get('kycLevel') || kycStatus?.level;
    const kycLevelIndex = kycLevels.findIndex(
      (item) => item === displayedKycLevel,
    );

    setActiveIndex(kycLevelIndex);
  }, [kycStatus?.level, searchParams]);

  return (
    <Page>
      <BackButton
        onClick={() => {
          if (backPath) {
            navigate(backPath);
          } else {
            window.history.back();
          }
        }}
      />
      <section className={themeClassName('header')}>
        <Text
          apple={{ variant: 'title2', weight: 'semibold' }}
          material={{ variant: 'headline6' }}
          align="center"
        >
          {t('kyc.settings.identification_level')}
        </Text>
        <Text
          apple={{ variant: 'body', weight: 'regular' }}
          material={{ variant: 'body', weight: 'regular' }}
          align="center"
        >
          {t('kyc.settings.description')}
        </Text>
      </section>
      <Section
        containerClassName={themeClassName('section')}
        description={t('kyc.settings.description_section')}
        apple={{ fill: 'quaternary' }}
        Component={InlineLayout}
      >
        {theme === 'apple' && (
          <SegmentedControl
            className={styles.segmentedControl}
            items={tabs}
            onChange={(index) => {
              setActiveIndex(index);
            }}
            activeItemIndex={activeIndex}
            selectedItemIndex={selectedIndex}
          />
        )}
        {theme === 'material' && (
          <Tabs
            tabs={tabs}
            activeTabIndex={activeIndex}
            selectedItemIndex={selectedIndex}
            onChange={(index) => {
              setActiveIndex(index);
            }}
            className={styles.tabs}
          />
        )}
        <div
          className={styles.gallery}
          style={{ height: tabsRef.current[activeIndex]?.clientHeight }}
        >
          {limitsKycLevels.map((item, index) => {
            const { key, value } = item;
            const limit = limits[key] as ByLevel;

            if (limit) {
              return (
                <div
                  className={classNames(
                    themeClassName('content'),
                    index === activeIndex && styles.active,
                  )}
                  key={key}
                  ref={(ref) => {
                    if (tabsRef.current && ref) {
                      tabsRef.current[index] = ref;
                    }
                  }}
                >
                  {selectedIndex <= index && (
                    <Text
                      className={themeClassName('contentTitle')}
                      apple={{ variant: 'body', weight: 'regular' }}
                      material={{ variant: 'body', weight: 'regular' }}
                    >
                      {kycLevels[selectedIndex] === value
                        ? t('kyc.settings.current_level')
                        : t(`kyc.settings.${value}_description`)}
                    </Text>
                  )}
                  <Cell.List separator={false} overlap>
                    <Cell>
                      <Cell.Text
                        bold
                        title={t('kyc.settings.incoming_transactions')}
                      />
                    </Cell>
                    <Cell
                      end={
                        <Cell.Text
                          title={
                            value === 'LEVEL_3'
                              ? '∞'
                              : printFiatAmount({
                                  amount: limit.incomingTransactions.daily,
                                  currency,
                                  languageCode: languageCode,
                                  currencyDisplay: 'code',
                                })
                          }
                        />
                      }
                    >
                      <Cell.Text title={t('kyc.settings.per_day')} />
                    </Cell>
                    <Cell
                      end={
                        <Cell.Text
                          title={
                            value === 'LEVEL_3'
                              ? '∞'
                              : printFiatAmount({
                                  amount: limit.incomingTransactions.monthly,
                                  currency,
                                  languageCode: languageCode,
                                  currencyDisplay: 'code',
                                })
                          }
                        />
                      }
                    >
                      <Cell.Text title={t('kyc.settings.per_month')} />
                    </Cell>
                  </Cell.List>

                  <Cell.List separator={false} overlap>
                    <Cell>
                      <Cell.Text
                        bold
                        title={t('kyc.settings.card_purchases')}
                      />
                    </Cell>
                    <Cell
                      end={
                        <Cell.Text
                          title={printFiatAmount({
                            amount: limit.cardPurchase.daily,
                            currency,
                            languageCode: languageCode,
                            currencyDisplay: 'code',
                          })}
                        />
                      }
                    >
                      <Cell.Text title={t('kyc.settings.per_day')} />
                    </Cell>
                    <Cell
                      end={
                        <Cell.Text
                          title={printFiatAmount({
                            amount: limit.cardPurchase.monthly,
                            currency,
                            languageCode: languageCode,
                            currencyDisplay: 'code',
                          })}
                        />
                      }
                    >
                      <Cell.Text title={t('kyc.settings.per_month')} />
                    </Cell>
                  </Cell.List>

                  <Cell.List separator={false} overlap>
                    <Cell>
                      <Cell.Text bold title={t('kyc.settings.p2p_purchases')} />
                    </Cell>
                    <Cell
                      end={
                        <Cell.Text
                          title={
                            value === 'LEVEL_3'
                              ? '∞'
                              : printFiatAmount({
                                  amount: limit.p2pPurchase.daily,
                                  currency,
                                  languageCode: languageCode,
                                  currencyDisplay: 'code',
                                })
                          }
                        />
                      }
                    >
                      <Cell.Text title={t('kyc.settings.per_day')} />
                    </Cell>
                    <Cell
                      end={
                        <Cell.Text
                          title={
                            value === 'LEVEL_3'
                              ? '∞'
                              : printFiatAmount({
                                  amount: limit.p2pPurchase.monthly,
                                  currency,
                                  languageCode: languageCode,
                                  currencyDisplay: 'code',
                                })
                          }
                        />
                      }
                    >
                      <Cell.Text title={t('kyc.settings.per_month')} />
                    </Cell>
                  </Cell.List>
                </div>
              );
            }
          })}
        </div>
      </Section>
      {kycLevels[selectedIndex] !== kycLevels[kycLevels.length - 1] && (
        <MainButton text={mainButtonText} onClick={handleClick} />
      )}
    </Page>
  );
};

export default Settings;
