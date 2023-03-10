import React from 'react';

import DynamicPage from '@app/components/DynamicPage';
import client from '@app/utils/client';

const FailingPage = () => (
  <DynamicPage title="Failing Page" contentLoader={client.getFailingPage} />
);

export default FailingPage;
