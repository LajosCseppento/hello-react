import React from 'react';

import DynamicPage from '@app/components/DynamicPage';
import client from '@app/utils/client';

const Home = () => <DynamicPage title="Home" loader={client.getHome} />;

export default Home;
