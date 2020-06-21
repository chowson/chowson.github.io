<template>
  <Layout>
    <hero />

    <div class="container-inner mx-auto py-16">
      <div v-for="post in $page.posts.edges" :key="post.id" class="post border-gray-400 border-b mb-12">
        <h2 class="text-3xl font-bold"><g-link :to="post.node.path" class="text-copy-primary">{{ post.node.title }}</g-link></h2>
        <div class="text-copy-secondary mb-4">
          <span>{{ post.node.date }}</span>
          <span> &middot; </span>
          <span>{{ post.node.timeToRead }} min read</span>
        </div>

        <div class="text-lg mb-4">
          {{ post.node.description }}
        </div>

        <div class="mb-8">
          <g-link :to="post.node.path" class="font-bold uppercase">Read More</g-link>
        </div>
      </div> <!-- end post -->

      <pagination-posts
        base="/blog"
        :totalPages="totalPageCount"
        :currentPage="1"
      />
    </div>
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allPost (sortBy: "date", order: DESC, perPage: 5, page: $page) {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        date (format: "MMMM D, Y")
        description
        timeToRead
        path
      }
    }
  }
}
</page-query>

<script>
import PaginationPosts from '../components/PaginationPosts'

export default {
  metaInfo: {
    title: 'Home',
    links: [
      { rel: 'canonical', href: 'https://chowson.github.io' }
    ],
    script: [
      {
        innerHTML: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "WebSite",
          "name": "chowson.github.io",
          "url": "https://chowson.github.io"
        }),
        type: 'application/ld+json'
      }
    ]
  },
  components: {
    PaginationPosts
  },
  computed : {
    totalPageCount() {
      return Math.ceil(this.$page.posts.totalCount / 5);
    }
  }
}
</script>