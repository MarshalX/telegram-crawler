import classNames from 'classnames';
import { FC, ImgHTMLAttributes, useState } from 'react';

import styles from './Image.module.scss';

export type ImageProps = {
  imgClassName?: string;
} & ImgHTMLAttributes<HTMLImageElement>;

function isAlreadyLoaded(src: string): boolean {
  const image = new window.Image();
  image.src = src;

  return image.complete;
}

export const Image: FC<ImageProps> = ({
  className,
  alt,
  onLoad,
  ...restProps
}) => {
  const [isLoaded, setIsLoaded] = useState(
    isAlreadyLoaded(restProps.src || ''),
  );

  return (
    <img
      {...restProps}
      onLoad={(event) => {
        setIsLoaded(true);
        onLoad && onLoad(event);
      }}
      className={classNames(styles.root, isLoaded && styles.loaded, className)}
      alt={alt}
    />
  );
};
