const path = require('path');
const _ = require('lodash');
const { existsSync, mkdirSync, writeFileSync } = require('fs');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve('src/templates/post.tsx');
  const tagTemplate = path.resolve('src/templates/tags.tsx');

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 2000) {
        edges {
          node {
            id
            frontmatter {
              path
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
    }
  `);

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const posts = result.data.postsRemark.edges;

  // Create post detail pages
  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        id: node.id,
      },
    });
  });

  // Extract tag data from query
  const tags = result.data.tagsGroup.group;

  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tag/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });

  // Create blog-list pages
  const postsPerPage = 5;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve('./src/templates/blog-list.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};

exports.onPostBootstrap = gatsby => {
  const blogPosts = gatsby.getNodesByType('MarkdownRemark');

  gatsby.reporter.info(`🔍️ Started creating search index json file...`);

  const indexesBaseFilePath = './static/search';
  if (!existsSync(indexesBaseFilePath)) {
    mkdirSync(indexesBaseFilePath);
  }

  const indexItems = blogPosts.map(post => ({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    path: post.frontmatter.path,
  }));

  writeFileSync(`${indexesBaseFilePath}/posts.json`, JSON.stringify(indexItems));

  gatsby.reporter.info(`🔍️ Finished creating search index json file with ${indexItems.length} posts...`);
};
