import * as Sentry from '@sentry/react';
import { useLanguages } from 'query/useLanguages';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import API from 'api/wallet';

import { RootState } from 'store';

import { updateLanguage } from 'reducers/settings/settingsSlice';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell, SelectionCell, SelectionCellSkeleton } from 'components/Cells';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';
import Skeleton from 'components/Skeleton/Skeleton';

import { repeat } from 'utils/common/common';
import { convertLangCodeFromISOtoAPI } from 'utils/common/lang';

import { useTheme } from 'hooks/utils/useTheme';

const Settings: FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { languageCode } = useSelector((state: RootState) => state.settings);
  const { data: languages = [], isLoading } = useLanguages();
  const [langpacksFetched, setLangpacksFetched] = useState(false);

  useEffect(() => {
    import('langpacks').then(({ default: langpacks }) => {
      Object.entries(langpacks).forEach(([langCode, langpack]) => {
        i18n.addResourceBundle(langCode, 'translation', langpack);
      });
      setLangpacksFetched(true);
    });
  }, []);

  return (
    <Page mode={theme === 'apple' ? 'secondary' : 'primary'}>
      <BackButton />

      <Section title={t('settings.language_title')} separator>
        <Skeleton
          skeletonShown={isLoading || !langpacksFetched}
          skeleton={
            <Cell.List>
              {repeat((index) => {
                return (
                  <SelectionCellSkeleton description mode="radio" key={index} />
                );
              }, 11)}
            </Cell.List>
          }
        >
          <div>
            <Cell.List>
              {languages.map((item) => {
                return (
                  <SelectionCell
                    name="languages"
                    mode="radio"
                    onChange={(langCode) => {
                      API.Language.setUserLanguage({
                        language: convertLangCodeFromISOtoAPI(langCode),
                      });

                      sessionStorage.setItem(
                        'wallet-langpack',
                        JSON.stringify(
                          i18n.getResourceBundle(langCode, 'translation'),
                        ),
                      );

                      Sentry.setTag('wallet.language', langCode);

                      dispatch(updateLanguage(langCode));
                    }}
                    checked={languageCode === item.language_code}
                    value={item.language_code}
                    description={
                      <span style={{ color: 'var(--tg-theme-text-color)' }}>
                        {item.translation}
                      </span>
                    }
                    key={item.language_code}
                  >
                    {item.language_name}
                  </SelectionCell>
                );
              })}
            </Cell.List>
          </div>
        </Skeleton>
      </Section>
    </Page>
  );
};

export default Settings;
