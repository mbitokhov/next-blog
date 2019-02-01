import * as React from 'react';
import '../../../styles/all.scss';
import MainLayout from '../layouts/Main';

export interface MarkdownProps {
  data: string;
  title?: string;
  subtitle?: string;
  description?: string;
  created?: Date;
  modified?: Date;
}

const MarkdownPage: React.FunctionComponent<MarkdownProps> = ({ title, description, data }) => (
  <MainLayout title={title} description={description}>
    <div className='markdown' dangerouslySetInnerHTML={{__html: data}}/>
  </MainLayout>
);

export default MarkdownPage;
