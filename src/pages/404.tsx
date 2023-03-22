import * as React from 'react';
import { HeadFC, PageProps } from 'gatsby';
import Layout from '../components/layout';
import { SEO } from '../components/seo';

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="container-inner mx-auto py-16">
        <h2 className="text-4xl font-bold mb-16">Page Not Found</h2>
        <img src="/images/404.svg" alt="404 page not foud" />
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <SEO title="Page Not Found" />;
