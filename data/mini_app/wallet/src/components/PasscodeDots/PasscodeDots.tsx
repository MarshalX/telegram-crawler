import classNames from 'classnames';
import { useMemo } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './PasscodeDots.module.scss';
import { ReactComponent as CircleEmptySVG } from './circle_empty.svg';
import { ReactComponent as CircleFullSVG } from './circle_full.svg';

export interface PasscodeDotsProps {
  passcodeLength: number;
  passcodeMaxLength: number;
  shake: boolean;
}

const PasscodeDots: React.FC<PasscodeDotsProps> = ({
  passcodeLength,
  passcodeMaxLength,
  shake,
}) => {
  const { themeClassName } = useTheme(styles);

  const dotSvgs = useMemo(() => {
    return Array(passcodeMaxLength)
      .fill(undefined)
      .map((_, i) => (
        <div className={themeClassName('svgContainer')} key={i}>
          <CircleFullSVG
            className={classNames(
              themeClassName('full'),
              i < passcodeLength && themeClassName('active'),
            )}
          />
          <CircleEmptySVG />
        </div>
      ));
  }, [passcodeMaxLength, passcodeLength]);

  return (
    <div
      className={classNames(
        styles.passcodeContainer,
        shake && styles.shakeHorizontal,
      )}
    >
      {dotSvgs}
    </div>
  );
};

export default PasscodeDots;
