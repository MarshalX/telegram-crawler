import { FC, MouseEventHandler, ReactNode } from 'react';

import { Cell } from 'components/Cells';
import Skeleton from 'components/Skeleton/Skeleton';

interface NewDetailCellProps {
  header: ReactNode | true;
  before?: ReactNode;
  after?: ReactNode;
  fetching?: boolean;
  onClick?: MouseEventHandler;
  children?: ReactNode;
  chevron?: boolean;
  bold?: boolean;
}

const NewDetailCell: FC<NewDetailCellProps> = ({
  fetching,
  onClick,
  header,
  children,
  after,
  before,
  chevron,
  bold,
}) => {
  return (
    <Skeleton
      skeletonShown={fetching}
      skeleton={
        <Cell start={before} end={after}>
          <Cell.Text skeleton description inverted />
        </Cell>
      }
    >
      <Cell onClick={onClick} start={before} end={after} chevron={chevron}>
        <Cell.Text bold={bold} description={header} title={children} inverted />
      </Cell>
    </Skeleton>
  );
};

export default NewDetailCell;
