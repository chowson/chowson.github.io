import React from 'react';
import { Link, graphql, PageProps, HeadFC } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import { SEO } from '../components/seo';
import Layout from '../components/layout';

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site,
  },
}: PageProps<Queries.TagsPageQuery>) => {
  return (
    <Layout>
      <section className="container-inner mx-auto my-8">
        <h1 className="text-4xl font-bold leading-tight">Tags</h1>
        <p className="text-xl text-gray-700 dark:text-gray-500 mt-4">Browse posts by tag</p>
        <ul className="ml-8 text-xl uppercase tracking-wide font-bold w-full block flex-grow space-y-8 items-center mt-10">
          {group.map(tag => (
            <li key={tag.tagName}>
              <Link to={`/tag/${kebabCase(tag.tagName ?? '')}/`} className="checkmark">
                {tag.tagName} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default TagsPage;

export const Head: HeadFC<Queries.TagsPageQuery> = () => <SEO title="Tags" />;

export const pageQuery = graphql`
  query TagsPage {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT } }) {
        tagName: fieldValue
        totalCount
      }
    }
  }
`;
