import { FC, memo } from 'react';

import { Text } from 'components/Text/Text';

import styles from './MnemonicDisplay.module.scss';

const MnemonicDisplay: FC<{ mnemonic: string[] }> = ({ mnemonic }) => {
  return (
    <div className={styles.mnemonic}>
      {mnemonic.map((item, index) => (
        <Text
          key={item}
          apple={{ variant: 'body', weight: 'regular', color: 'hint' }}
          material={{
            variant: 'body',
            weight: 'regular',
            color: 'hint',
          }}
          className={styles.mnemonicWordWrapper}
        >
          <div className={styles.number}>{`${index + 1}. `}</div>
          <Text
            apple={{
              variant: 'body',
              weight: 'medium',
              color: 'text',
            }}
            material={{
              variant: 'body',
              weight: 'medium',
              color: 'text',
            }}
            className={styles.mnemonicWord}
          >
            {item}
          </Text>
        </Text>
      ))}
    </div>
  );
};

export default memo(MnemonicDisplay);
