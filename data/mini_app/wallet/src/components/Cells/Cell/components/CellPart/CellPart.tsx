import classnames from 'classnames/bind';
import { FC } from 'react';

import styles from './CellPart.module.scss';

export const CellPart: FC<{
  type:
    | 'avatar'
    | 'switch'
    | 'checkbox'
    | 'radio'
    | 'icon'
    | 'roundedIcon'
    | 'tabs'
    | 'segmentedControl';
}> = ({ type, children }) => {
  return <div className={classnames(styles[type])}>{children}</div>;
};
