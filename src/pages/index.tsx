import * as React from 'react';
import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import Layout from '../components/layout';
import { SEO } from '../components/seo';
import Hero from '../components/hero';
import { PaginationPosts } from '../components/pagination-posts';

const IndexPage: React.FC<PageProps<Queries.IndexPageQuery>> = ({ data, pageContext }) => {
  return (
    <Layout>
      <Hero />

      <div className="container-inner mx-auto py-16">
        {data.allMarkdownRemark.nodes.slice(0, 5).map(post => (
          <div className="post border-gray-400 border-b mb-12" key={post.id}>
            <h2 className="text-3xl font-bold">
              <Link to={post.frontmatter?.path ?? '#'} className="text-copy-primary">
                {post.frontmatter?.title}
              </Link>
            </h2>
            <div className="text-copy-secondary mb-4">
              <span>{post.frontmatter?.date}</span>
              <span> &middot; </span>
              <span>{post.timeToRead} min read</span>
            </div>

            <div className="text-lg mb-4">{post.frontmatter?.description}</div>

            <div className="mb-8">
              <Link to={post.frontmatter?.path ?? '#'} className="font-bold uppercase">
                Read post
              </Link>
            </div>
          </div>
        ))}

        <PaginationPosts base="/blog" totalPages={Math.ceil(data.allMarkdownRemark.totalCount / 5)} currentPage={1} />
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <SEO>
    <script type="application/ld+json">
      {JSON.stringify(
        {
          '@context': 'https://schema.org/',
          '@type': 'WebSite',
          name: 'chowson.github.io',
          url: 'https://chowson.github.io',
          image: 'https://chowson.github.io/images/logo.png',
        },
        null,
        2,
      )}
    </script>
  </SEO>
);

export const query = graphql`
  query IndexPage {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      totalCount
      nodes {
        id
        frontmatter {
          path
          date(formatString: "MMMM D, Y")
          title
          description
        }
        excerpt
        timeToRead
      }
    }
  }
`;
