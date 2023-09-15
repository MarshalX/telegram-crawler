import { FC } from 'react';

import { Cell } from 'components/Cells';
import InitialsAvatarSkeleton from 'components/InitialsAvatar/InitialsAvatarSkeleton';

import { useTheme } from 'hooks/utils/useTheme';

const TransactionCellSkeleton: FC = () => {
  const theme = useTheme();

  return (
    <Cell
      start={
        <Cell.Part type="avatar">
          <InitialsAvatarSkeleton size={theme === 'apple' ? 40 : 46} />
        </Cell.Part>
      }
      end={<Cell.Text align="end" style={{ width: 60 }} skeleton description />}
    >
      <Cell.Text skeleton description />
    </Cell>
  );
};

export default TransactionCellSkeleton;
