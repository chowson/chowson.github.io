import React from 'react';
import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import Layout from '../components/layout';
import Hero from '../components/hero';
import { SEO } from '../components/seo';
import { PaginationPosts } from '../components/pagination-posts';

type BlogListPageContext = {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
};

const BlogListTemplate = ({ data, pageContext }: PageProps<Queries.BlogListTemplateQuery, BlogListPageContext>) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Hero leadingText="Sitecore, C# &amp; ASP.NET Development Blog" leadingTight={`Page ${pageContext.currentPage}`} large={false} />

      <div className="container-inner mx-auto py-16">
        {posts.map(post => (
          <article key={post.node.id} className="post border-gray-400 border-b mb-12">
            <h2 className="text-3xl font-bold">
              <Link to={post.node.frontmatter?.path ?? '#'} className="text-copy-primary">
                {post.node.frontmatter?.title}
              </Link>
            </h2>
            <div className="text-copy-secondary mb-4">
              <span>{post.node.frontmatter?.date}</span>
              <span> &middot; </span>
              <span>{post.node.timeToRead} min read</span>
            </div>

            <div className="text-lg mb-4">{post.node.frontmatter?.description}</div>

            <div className="mb-8">
              <Link to="post.node.path" className="font-bold uppercase">
                Read post
              </Link>
            </div>
          </article>
        ))}

        {pageContext.numPages > 1 && <PaginationPosts base="/blog" totalPages={pageContext.numPages} currentPage={pageContext.currentPage} />}
      </div>
    </Layout>
  );
};

export default BlogListTemplate;

export const Head: HeadFC<Queries.BlogPostTemplateQuery> = () => <SEO title="Blog" />;

export const query = graphql`
  query BlogListTemplate($skip: Int!, $limit: Int!) {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: $limit, skip: $skip) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            path
            date(formatString: "MMMM D, Y")
          }
          timeToRead
        }
      }
    }
  }
`;
