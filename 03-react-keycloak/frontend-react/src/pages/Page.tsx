import React from 'react';

import DynamicPage from '@app/components/DynamicPage';
import client from '@app/utils/client';

const Page = () => <DynamicPage title="Page" contentLoader={client.getPage} />;

export default Page;
