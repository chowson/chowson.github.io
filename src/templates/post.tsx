import * as React from 'react';
import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import Layout from '../components/layout';
import kebabCase from 'lodash/kebabCase';
import { SEO } from '../components/seo';
import '../styles/github-markdown.css';
import '../styles/prism-nord.css';

const BlogPostTemplate = ({
  data, // this prop will be injected by the GraphQL query below.
}: PageProps<Queries.BlogPostTemplateQuery>) => {
  const { markdownRemark } = data; // data.markdownRemark holds your post data

  const frontmatter = markdownRemark?.frontmatter;
  return (
    <Layout>
      <div className="container-inner mx-auto my-8">
        <article>
          <h1 className="text-4xl font-bold leading-tight">{frontmatter?.title}</h1>
          <div className="text-xl text-gray-700 dark:text-gray-500">{frontmatter?.date}</div>
          <div className="text-sm text-gray-700 dark:text-gray-500 mb-4">{markdownRemark?.timeToRead} min read</div>
          <div className="flex mb-8 text-sm">
            {frontmatter?.tags?.map(tag => (
              <Link
                to={`/tag/${kebabCase(tag ?? '')}`}
                key={tag}
                className="bg-gray-300 rounded-full px-4 py-2 mr-4 text-brand-900 hover:bg-brand-300"
              >
                {tag}
              </Link>
            ))}
          </div>
          <div className="markdown-body mb-8" dangerouslySetInnerHTML={{ __html: markdownRemark?.html ?? '' }} />
          {(markdownRemark?.frontmatter?.references?.length ?? 0) > 0 && (
            <div className="mb-6 pt-6 border-t-1 border-gray-600">
              <h2 className="text-xl">References</h2>
              <ul className="list-disc list-inside">
                {frontmatter?.references?.map(
                  reference =>
                    reference && (
                      <li key={reference}>
                        <a
                          className="external mb-1 inline-block"
                          style={{ padding: '5px 0' }}
                          target="_blank"
                          rel="noreferrer"
                          href={reference.split('|')[0]}
                        >
                          {reference.split('|')[1]}
                        </a>
                      </li>
                    ),
                )}
              </ul>
            </div>
          )}
          <div className="mb-8 pt-2 border-t-3 border-double border-gray-600">
            <Link to="/" className="font-bold uppercase">
              Back to Blog
            </Link>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default BlogPostTemplate;

export const Head: HeadFC<Queries.BlogPostTemplateQuery> = ({ data }) => (
  <SEO title={data.markdownRemark?.frontmatter?.title}>
    <script type="application/ld+json">
      {JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: data.markdownRemark?.frontmatter?.title,
          datePublished: data.markdownRemark?.frontmatter?.dateIso,
          dateModified: data.markdownRemark?.frontmatter?.dateIso,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://chowson.github.io${data.markdownRemark?.frontmatter?.path}`,
          },
          author: [
            {
              '@type': 'Person',
              name: 'Chris Howson',
              url: 'https://github.com/chowson',
            },
          ],
          publisher: {
            '@type': 'Organization',
            name: 'chowson.github.io',
            logo: {
              '@type': 'ImageObject',
              url: 'https://chowson.github.io/images/logo.png',
            },
          },
          image: 'https://chowson.github.io/images/logo.png',
          description: data.markdownRemark?.frontmatter?.description,
        },
        null,
        2,
      )}
    </script>
  </SEO>
);

export const query = graphql`
  query BlogPostTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        path
        date(formatString: "MMMM DD, YYYY")
        dateIso: date
        tags
        references
        description
      }
      html
      timeToRead
    }
  }
`;
