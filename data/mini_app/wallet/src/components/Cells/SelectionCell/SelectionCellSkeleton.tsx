import { FC, ReactNode } from 'react';

import { Cell } from 'components/Cells';
import { Checkmark } from 'components/Checkmark/Checkmark';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './SelectionCell.module.scss';

interface SelectionCellSkeletonProps {
  description?: boolean;
  mode?: 'checkbox' | 'radio';
  start?: ReactNode;
  end?: ReactNode;
  checkmarkPlacement?: 'start' | 'end';
}

const SelectionCellSkeleton: FC<SelectionCellSkeletonProps> = ({
  mode = 'radio',
  start,
  end,
  description,
  checkmarkPlacement,
}) => {
  const theme = useTheme();

  let resolvedCheckmarkPlacement;

  if (checkmarkPlacement) {
    resolvedCheckmarkPlacement = checkmarkPlacement;
  } else if (theme === 'material' || mode === 'checkbox') {
    resolvedCheckmarkPlacement = 'start';
  } else {
    resolvedCheckmarkPlacement = 'end';
  }

  return (
    <label className={styles.root}>
      <Cell
        start={
          resolvedCheckmarkPlacement === 'start' ? (
            <Cell.Part type={mode}>
              <Checkmark mode={mode} />
            </Cell.Part>
          ) : (
            start
          )
        }
        end={
          resolvedCheckmarkPlacement === 'end' ? (
            <Cell.Part type={mode}>
              <Checkmark mode={mode} />
            </Cell.Part>
          ) : (
            end
          )
        }
      >
        <Cell.Text description={description} skeleton />
      </Cell>
    </label>
  );
};

export default SelectionCellSkeleton;
