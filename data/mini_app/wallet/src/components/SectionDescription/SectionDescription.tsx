import { FC, ReactNode } from 'react';

import { Text } from 'components/Text/Text';

const SectionDescription: FC<{ className?: string; action?: ReactNode }> = ({
  children,
  className,
}) => {
  return (
    <Text
      apple={{ variant: 'footnote', color: 'hint' }}
      material={{ variant: 'subtitle2', weight: 'regular', color: 'hint' }}
      className={className}
    >
      {children}
    </Text>
  );
};

export default SectionDescription;
