import { Suspense, lazy } from 'react';

import { ReactComponent as NotFoundUtkaSVG } from 'images/not_found_utka.svg';

const NotFoundUtkaAnimation = lazy(() => import('./NotFoundUtkaAnimation'));

const NotFoundUtka = ({ className }: { className?: string }) => {
  return (
    <Suspense fallback={<NotFoundUtkaSVG className={className} />}>
      <NotFoundUtkaAnimation className={className} />
    </Suspense>
  );
};

export default NotFoundUtka;
