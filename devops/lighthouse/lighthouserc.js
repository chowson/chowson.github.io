module.exports = {
    ci: {
      collect: {
        numberOfRuns: 1,
        url: [
            'http://localhost:8080/',
            'http://localhost:8080/tag/automated-testing/',
            'http://localhost:8080/tag/debugging/',
            'http://localhost:8080/tag/sitecore/',
            'http://localhost:8080/tag/sitecore/2/',
            'http://localhost:8080/tag/sitecore/3/',
            'http://localhost:8080/tag/sql/',
            'http://localhost:8080/tag/aws/',
            'http://localhost:8080/tag/mvc/',
            'http://localhost:8080/tag/Azure/',
            'http://localhost:8080/tag/Devops/',
            'http://localhost:8080/blog/2/',
            'http://localhost:8080/blog/3/',
            'http://localhost:8080/blog/4/',
            'http://localhost:8080/tag/',
            'http://localhost:8080/block-requests-with-fiddlercore/',
            'http://localhost:8080/find-sitecore-users-with-profile-setting/',
            'http://localhost:8080/security-based-publishing-restrictions-in-sitecore/',
            'http://localhost:8080/sitecore-7-2-150408-clones-performance-issue/',
            'http://localhost:8080/aws-attach-volume-autoscaling-group-cloudformation/',
            'http://localhost:8080/sitecore-mvc-programmatically-add-renderings-with-caching/',
            'http://localhost:8080/aws-retrieve-admin-password-from-windows-ami/',
            'http://localhost:8080/aws-bulk-password-retrieval/',
            'http://localhost:8080/sync-sitecore-logs-to-cloudwatch-logs/',
            'http://localhost:8080/analyse-sitecore-logs-in-aws-cloudwatch-logs/',
            'http://localhost:8080/sitecore-8-1-device-detection/',
            'http://localhost:8080/sitecore-experience-analytics-cache-tuning/',
            'http://localhost:8080/empty-sitecore-recycle-bin-periodically/',
            'http://localhost:8080/dynamic-html-tags-in-mvc-razor/',
            'http://localhost:8080/sitecore-item-paths-in-sql-queries/',
            'http://localhost:8080/7-tips-to-get-started-with-sitecore-commerce-9/',
            'http://localhost:8080/managing-sitecore-content-with-continuous-delivery/',
            'http://localhost:8080/vuejs-sitecore-mvc-and-experience-editor/',
            'http://localhost:8080/vuejs-sitecore-mvc/',
            'http://localhost:8080/deploy-storybook-with-azure-devops-pipelines/',
            'http://localhost:8080/',
        ],
        startServerCommand: 'docker-compose -f .\\devops\\docker-compose.yml up',
      },
      assert: {
        "preset": "lighthouse:no-pwa",
        assertions: {
          "uses-long-cache-ttl": "off",
          "legacy-javascript": "off",
          "unused-javascript": "off"
        }
      },
      upload: {
        target: 'filesystem',
        outputDir: './devops/lighthouse/reports'
      },
    },
  };