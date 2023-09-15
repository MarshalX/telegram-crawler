import classNames from 'classnames';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { FC, useEffect, useRef } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import { useDidUpdate } from '../../hooks/utils/useDidUpdate';
import styles from './Checkmark.module.scss';
import CheckmarkFallback from './CheckmarkFallback';
import CheckboxAndroidAnimationData from './checkbox_android.json';
import CheckboxIosAnimationData from './checkbox_ios.json';
import RadioAndroidAnimationData from './radio_android.json';
import RadioIosAnimationData from './radio_ios.json';

const CheckmarkLottie: FC<{
  checked?: boolean;
  mode?: 'radio' | 'checkbox';
}> = ({ checked, mode = 'radio' }) => {
  const { theme, themeClassName } = useTheme(styles);
  const ref = useRef<LottieRefCurrentProps>(null);

  useDidUpdate(() => {
    if (checked) {
      ref.current?.goToAndPlay(3, true);
    } else {
      ref.current?.stop();
    }
  }, [checked]);

  useEffect(() => {
    if (checked) {
      ref.current?.goToAndStop(29, true);
    }
  }, []);

  let data;

  if (theme === 'material') {
    data =
      mode === 'radio'
        ? RadioAndroidAnimationData
        : CheckboxAndroidAnimationData;
  } else {
    data = mode === 'radio' ? RadioIosAnimationData : CheckboxIosAnimationData;
  }

  if (!checked) {
    return <CheckmarkFallback checked={checked} mode={mode} />;
  }

  return (
    <Lottie
      autoplay={false}
      className={classNames(
        themeClassName('root'),
        styles[mode],
        checked && styles.checked,
      )}
      lottieRef={ref}
      loop={false}
      alt="radio"
      animationData={data}
    />
  );
};

export default CheckmarkLottie;
