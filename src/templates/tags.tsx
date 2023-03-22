import React from 'react';

// Components
import { Link, graphql, PageProps, HeadFC } from 'gatsby';
import Layout from '../components/layout';
import { SEO } from '../components/seo';

type TagPageTemplatePageContext = {
  tag: string;
};

const TagPageTemplate = ({ pageContext, data }: PageProps<Queries.TagPageTemplateQuery, TagPageTemplatePageContext>) => {
  const { tag } = pageContext;
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout>
      <div className="container-inner mx-auto my-16">
        <section>
          <h2 className="text-4xl font-bold mb-8">Tag: {tag}</h2>
        </section>
        {edges.map(({ node }) => {
          const slug = node.frontmatter?.path;
          const title = node.frontmatter?.title;

          return (
            <article key={node.id} className="post border-gray-400 border-b mb-12">
              <h2 className="text-3xl font-bold">
                <Link to={slug ?? '#'} className="text-copy-primary">
                  {node.frontmatter?.title}
                </Link>
              </h2>
              <div className="text-copy-secondary mb-4">
                <span>{node.frontmatter?.date}</span>
                <span> &middot; </span>
                <span>{node.timeToRead} min read</span>
              </div>

              <div className="text-lg mb-4">{node.frontmatter?.description}</div>

              <div className="mb-8">
                <Link to={node.frontmatter?.path ?? '#'} className="font-bold uppercase">
                  Read post
                </Link>
              </div>
            </article>
          );
        })}

        {/* <pagination-posts
        v-if="$page.tag.belongsTo.pageInfo.totalPages > 1"
        :base="`/tag/${$page.tag.title}`"
        :totalPages="$page.tag.belongsTo.pageInfo.totalPages"
        :currentPage="$page.tag.belongsTo.pageInfo.currentPage"
      /> */}
      </div>
    </Layout>
  );
};

export default TagPageTemplate;

export const Head: HeadFC<Queries.TagPageTemplateQuery, TagPageTemplatePageContext> = ({ pageContext }) => <SEO title={`Tag: ${pageContext}`} />;

export const query = graphql`
  query TagPageTemplate($tag: String) {
    allMarkdownRemark(limit: 2000, sort: { frontmatter: { date: DESC } }, filter: { frontmatter: { tags: { in: [$tag] } } }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            path
            title
            description
            date(formatString: "MMMM D, Y")
          }
          timeToRead
        }
      }
    }
  }
`;
