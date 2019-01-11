import * as React from 'react';
import MainLayout from '../layouts/Main';

interface Props {
  data: string;
  title?: string;
  description?: string;
}

const MarkdownPost: React.FunctionComponent<Props> = ({ title, description, data }) => (
  <MainLayout title={title} description={description}>
    <div className='markdown' dangerouslySetInnerHTML={{__html: data}}/>
  </MainLayout>
);

export default MarkdownPost;
