import { FC } from 'react';
import * as React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { CollectiblePreview as CollectiblePreviewPayload } from 'api/getGems/generated';

import routePaths from 'routePaths';

import { useTheme } from 'hooks/utils/useTheme';

import { Media } from '../Media/Media';
import styles from './CollectiblePreview.module.scss';

interface CollectiblePreviewProps {
  collectiblePreview: CollectiblePreviewPayload;
}

export const CollectiblePreview: FC<CollectiblePreviewProps> = ({
  collectiblePreview,
}) => {
  const navigate = useNavigate();
  const { themeClassName } = useTheme(styles);
  return (
    <Media
      onClick={() =>
        navigate(
          generatePath(routePaths.COLLECTIBLE, {
            address: collectiblePreview.address,
          }),
        )
      }
      onlyPreview
      className={themeClassName('root')}
      key={collectiblePreview.address}
      payload={collectiblePreview.content}
    />
  );
};
