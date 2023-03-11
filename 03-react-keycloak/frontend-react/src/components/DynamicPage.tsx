import React from 'react';

import DynamicTypography from './DynamicTypography';
import PageTitle from './PageTitle';

type Props = {
  title: string;
  contentLoader: (signal?: AbortSignal) => Promise<string>;
};

const DynamicPage = ({title, contentLoader}: Props) => (
  <>
    <PageTitle value={title} />
    <DynamicTypography contentLoader={contentLoader} />
  </>
);

export default DynamicPage;
