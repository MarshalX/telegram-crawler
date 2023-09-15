import classNames from 'classnames';
import { FC } from 'react';

import {
  Placeholder,
  PlaceholderProps,
} from 'components/Placeholder/Placeholder';

type PagePlaceholderProps = PlaceholderProps;

export const PagePlaceholder: FC<PagePlaceholderProps> = ({
  className,
  style,
  ...restProps
}) => {
  return (
    <div className={classNames('container', className)} style={style}>
      <Placeholder {...restProps} />
    </div>
  );
};
