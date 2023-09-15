import { OrderSkeleton } from 'pages/p2p/OrderPage/components/OrderSkeleton/OrderSkeleton';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';

import { useTheme } from 'hooks/utils/useTheme';

const OrderPageFallback = () => {
  const theme = useTheme();

  return (
    <Page mode={theme === 'material' ? 'secondary' : 'primary'}>
      <BackButton />
      <OrderSkeleton isShown></OrderSkeleton>
    </Page>
  );
};

export { OrderPageFallback };
