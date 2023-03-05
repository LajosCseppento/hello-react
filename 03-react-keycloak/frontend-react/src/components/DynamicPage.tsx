import React from 'react';

import DynamicTypography from './DynamicTypography';
import PageTitle from './PageTitle';

type Props = {
  title: string;
  loader: () => Promise<string>;
};

const DynamicPage = ({title, loader}: Props) => (
  <>
    <PageTitle value={title} />
    <DynamicTypography loader={loader} />
  </>
);

export default DynamicPage;
