import cn from 'classnames';
import { FC } from 'react';

import { NumericInput } from 'components/NumericInput';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Filter.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  className?: string;
}

const FilterInput: FC<Props> = ({
  id,
  value,
  onChange,
  label,
  placeholder,
  className,
  ...props
}) => {
  const { themeClassName } = useTheme(styles);

  return (
    <div className={cn(styles.root, themeClassName('rootInput'), className)}>
      <label htmlFor={id} className={themeClassName('label')}>
        {label}
      </label>
      <NumericInput
        id={id}
        autoComplete="off"
        inputMode="decimal"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(themeClassName('value'), styles.input)}
        {...props}
      />
    </div>
  );
};

export default FilterInput;
