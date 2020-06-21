// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'chowson.github.io',
  siteUrl: 'https://chowson.github.io',
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
        [ 'gridsome-plugin-remark-shiki', { theme: 'nord', skipInline: true } ]
      ],
    }
  }
}
