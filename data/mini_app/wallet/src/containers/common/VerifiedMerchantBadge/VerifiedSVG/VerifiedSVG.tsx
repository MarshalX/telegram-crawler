import cn from 'classnames';

import s from './VerifiedSVG.module.scss';
import { ReactComponent as VerVerifiedBackSVG } from './verified_back.svg';
import { ReactComponent as VerVerifiedFrontSVG } from './verified_front.svg';

export const VerifiedSVG = ({
  className,
  width,
  height,
}: {
  className?: string;
  width?: string;
  height?: string;
}) => {
  return (
    <div
      className={cn(s.root, className)}
      style={{
        width: width,
        height: height,
      }}
    >
      <VerVerifiedBackSVG className={s.back} width={width} height={height} />
      <VerVerifiedFrontSVG className={s.front} width={width} height={height} />
    </div>
  );
};
