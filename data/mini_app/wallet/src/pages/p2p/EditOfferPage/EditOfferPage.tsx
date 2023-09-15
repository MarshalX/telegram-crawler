import * as Sentry from '@sentry/react';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import CreateEditOffer from 'containers/p2p/CreateEditOffer/CreateEditOffer';

const EditOfferPage = () => {
  const params = useParams();

  if (!params.id) {
    Sentry.captureException(new Error('No offerId in params'));
    return null;
  }

  return <CreateEditOffer mode="edit" offerId={params.id} />;
};

export default EditOfferPage;
