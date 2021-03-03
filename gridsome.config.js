// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

//const customNord = require('./node_modules/shiki-themes/data/nord.json');
const fs = require('fs');
const shiki = require('shiki')
const customNord = shiki.loadTheme('./node_modules/shiki-themes/data/nord.json')
const constantNumeric = customNord.tokenColors.find((setting) => setting.name === 'Constant Numeric');
constantNumeric.settings.foreground = "#C2A3BC";
const comment = customNord.tokenColors.find((setting) => setting.name === 'Comment');
comment.settings.foreground = "#8893aa";
fs.writeFileSync('./node_modules/shiki-themes/data/nord.json', JSON.stringify(customNord, null, 2));

module.exports = {
  siteName: 'chowson.github.io',
  siteUrl: 'https://chowson.github.io',
  titleTemplate: '%s | chowson.github.io',
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        purgeConfig: {
          content: [
            './src/**/*.vue',
            './src/**/*.js',
            './src/**/*.jsx',
            './src/**/*.html',
            './src/**/*.pug',
            './src/**/*.md',
            './docs/**/*.md',
            './blog/**/*.md',
          ],
          whitelist: [
            'body',
            'html',
            'img',
            'a',
            'g-image',
            'g-image--lazy',
            'g-image--loaded',
            'active',
          ],
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        },
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },    
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        exclude: ['/blog/', '/blog/1/'],
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'chowson.github.io',
          feed_url: 'https://chowson.github.io/rss.xml',
          site_url: 'https://chowson.github.io/'
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: 'https://chowson.github.io' + node.path,
          category: node.tags[0],
          pubDate: node.date.toUTCString()
        }),
        output: {
          dir: './static',
          name: 'rss.xml'
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-16993654-2'
      }
    }
  ],
  templates: {
    Tag: '/tag/:id',
    Post: '/:path'
  },
  transformers: {
    remark: {
      plugins: [
        [ 'remark-attr', {} ],
        [ 'gridsome-plugin-remark-shiki', { theme: 'nord', skipInline: true } ],
        [ 'remark-autolink-headings', {
            linkProperties: {ariaHidden: 'true', tabIndex: -1}
          }
        ]
      ],
    }
  }
}
