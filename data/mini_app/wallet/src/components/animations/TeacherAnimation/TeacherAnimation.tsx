import Lottie from 'lottie-react';
import { FC } from 'react';

import TeacherAnimationData from './teacher.json';

const TeacherAnimation: FC<{ className?: string }> = ({ className }) => {
  return (
    <Lottie
      autoplay={true}
      loop={false}
      className={className}
      alt="teacher"
      animationData={TeacherAnimationData}
    />
  );
};

export default TeacherAnimation;
