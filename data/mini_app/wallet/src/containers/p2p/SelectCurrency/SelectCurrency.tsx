import { useTranslation } from 'react-i18next';

import { Cell, SelectionCell } from 'components/Cells';
import Section from 'components/Section/Section';

import { useSupportedFiatCurrencies } from 'hooks/p2p';

export const SelectCurrency = ({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (value: string) => void;
}) => {
  const { t } = useTranslation();

  const { data: supportedFiatCurrencies = [] } = useSupportedFiatCurrencies();

  return (
    <Section separator title={t('p2p.select_currency')}>
      <Cell.List>
        {supportedFiatCurrencies.map((currency) => (
          <SelectionCell
            onChange={onSelect}
            checked={value === currency}
            value={currency}
            key={currency}
            name="currencies"
          >
            {currency}
          </SelectionCell>
        ))}
      </Cell.List>
    </Section>
  );
};
