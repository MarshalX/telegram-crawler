import cn from 'classnames';
import * as React from 'react';

import { SelectList } from 'components/SelectList';
import Tappable from 'components/Tappable/Tappable';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ArrowDownMaterialSVG } from 'images/arrow_down_material.svg';
import { ReactComponent as ArrowsSVG } from 'images/arrows_vertical.svg';

import styles from './Filter.module.scss';

interface Props {
  value: string;
  label: string;
  options?: {
    value: string;
    label: string;
  }[];
  onChange?: (value: string) => void;
  onClick?: () => void;
  className?: string;
  selectedValueTestId?: string;
  'data-testid'?: string;
}

const FilterSelect: React.FC<Props> = ({
  value,
  options,
  onChange,
  onClick,
  label,
  className,
  selectedValueTestId,
  'data-testid': dataTestId,
}) => {
  const { theme, themeClassName } = useTheme(styles);

  const Content = (
    <Tappable
      Component="button"
      rootClassName={cn(styles.root, className)}
      className={styles.rootContent}
      data-testid={dataTestId}
      onClick={onClick}
    >
      <div>
        <div className={themeClassName('label')}>{label}</div>
        <div
          className={themeClassName('value')}
          data-testid={selectedValueTestId}
        >
          {value}
        </div>
      </div>
      {theme === 'apple' ? (
        <ArrowsSVG className={themeClassName('arrows')} />
      ) : (
        <ArrowDownMaterialSVG className={themeClassName('arrows')} />
      )}
    </Tappable>
  );

  if (options && onChange) {
    return (
      <SelectList
        value={value}
        options={options}
        onChange={onChange}
        floatingShiftPadding={theme === 'apple' ? 16 : 16}
      >
        {Content}
      </SelectList>
    );
  }

  return Content;
};

export default FilterSelect;
