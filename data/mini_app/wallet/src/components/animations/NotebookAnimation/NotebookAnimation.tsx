import Lottie from 'lottie-react';
import { FC } from 'react';

import NotebookAnimationData from './notebook.json';

const NotebookAnimation: FC<{ className?: string }> = ({ className }) => {
  return (
    <Lottie
      loop={false}
      className={className}
      animationData={NotebookAnimationData}
    />
  );
};

export default NotebookAnimation;
