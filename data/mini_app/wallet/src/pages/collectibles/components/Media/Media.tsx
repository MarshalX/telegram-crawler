import classNames from 'classnames';
import type { FC } from 'react';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';

import {
  Lottie as LottiePayload,
  Media as MediaPayload,
  Video as VideoPayload,
} from 'api/getGems/generated';

import { Image } from 'components/Image/Image';

import { useTimeout } from 'hooks/utils/useTimeout';

import styles from './Media.module.scss';

const Lottie = lazy(() => import('lottie-react'));

interface CommonMediaProps {
  onlyPreview?: boolean;
}

interface MediaProps extends CommonMediaProps {
  payload?: MediaPayload;
  className?: string;
  onClick?: VoidFunction;
}

const IMAGE_ANIMATION_DURATION = 400;

/**
 * Hack to autoplay video on iOS.
 */
export function autoplayVideoIfPaused(videoEl: HTMLVideoElement) {
  document.addEventListener(
    'touchstart',
    function () {
      if (videoEl.paused) {
        videoEl.muted = true;
        videoEl.play().catch(console.warn);
      }
    },
    { once: true },
  );
}

interface VideoMediaProps extends CommonMediaProps {
  payload: VideoPayload;
}

type UseLoaded = () => [(callback?: VoidFunction | undefined) => void, boolean];

const useLoaded: UseLoaded = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [setLoadedTimeout] = useTimeout();

  return [
    (callback?: VoidFunction) => {
      setLoadedTimeout(() => {
        setLoaded(true);
        if (callback) {
          callback();
        }
      }, IMAGE_ANIMATION_DURATION);
    },
    isLoaded,
  ];
};

const VideoMedia: FC<VideoMediaProps> = ({ payload, onlyPreview }) => {
  const [videoLoadFail, setVideoLoadFail] = useState(false);
  const videoEl = useRef<HTMLVideoElement>(null);
  const [onLoad, isLoaded] = useLoaded();
  const [isPreviewShown, setIsPreviewShown] = useState(true);

  useEffect(() => {
    if (videoEl.current) {
      autoplayVideoIfPaused(videoEl.current);
    }
  }, []);

  /**
   * There is a moment at telegram web view between video loaded and video playing when no content or poster shown,
   * so it flickers. There are no event from video api allows us to understand when it finished.
   * That`s why we show preview until self chosen timeout finished.
   * We need to remove preview because it can has wrong size, so it will be visible on background.
   */
  const [setRemovePreviewTimeout] = useTimeout();

  const onCanPlay = () => {
    onLoad(() => {
      setRemovePreviewTimeout(() => {
        setIsPreviewShown(false);
      }, 700);
    });
  };

  return (
    <>
      {!videoLoadFail && !onlyPreview && (
        <video
          ref={videoEl}
          className={classNames(styles.video, isLoaded && styles.loaded)}
          src={payload.video}
          autoPlay={true}
          loop={true}
          muted={true}
          controls={false}
          playsInline={true}
          disablePictureInPicture={true}
          disableRemotePlayback={true}
          onCanPlay={onCanPlay}
          onError={() => {
            setVideoLoadFail(true);
          }}
        />
      )}
      {isPreviewShown && (
        <Image className={styles.image} src={payload.preview} />
      )}
    </>
  );
};

interface LottieMediaProps extends CommonMediaProps {
  payload: LottiePayload;
}

const LottieMedia: FC<LottieMediaProps> = ({ payload, onlyPreview }) => {
  const [lottieJson, setLottieJson] = useState<unknown>();
  const [onLoad, isLoaded] = useLoaded();

  useEffect(() => {
    if (payload?.typename === 'Lottie') {
      (async () => {
        try {
          const json = await fetch(payload.lottie).then((r) => r.json());
          setLottieJson(json);
        } catch (e) {
          console.warn('Failed to load Lottie', e);
        }
      })();
    }
  }, [payload]);

  const onDOMLoaded = () => {
    onLoad();
  };

  return (
    <>
      {!onlyPreview && !!lottieJson && (
        <Suspense fallback={null}>
          <Lottie
            onDOMLoaded={onDOMLoaded}
            className={classNames(styles.lottie, isLoaded && styles.loaded)}
            animationData={lottieJson}
            loop={true}
          />
        </Suspense>
      )}
      {!isLoaded && <Image className={styles.image} src={payload.preview} />}
    </>
  );
};

export const Media: FC<MediaProps> = ({
  payload,
  className,
  onlyPreview = false,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={classNames(styles.root, className)}>
      {payload?.typename === 'Image' && (
        <Image className={styles.image} src={payload.image} />
      )}
      {payload?.typename === 'Video' && (
        <VideoMedia payload={payload} onlyPreview={onlyPreview} />
      )}
      {payload?.typename === 'Lottie' && (
        <LottieMedia payload={payload} onlyPreview={onlyPreview} />
      )}
    </div>
  );
};
