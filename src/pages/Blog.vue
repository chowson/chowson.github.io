<template>
  <Layout>
    <hero
        leading-text="Sitecore, C# &amp; ASP.NET Development Blog"
        :leading-tight="`Page ${$page.posts.pageInfo.currentPage}`"
        :large="false" />

    <div class="container-inner mx-auto py-16">
      <article v-for="post in $page.posts.edges" :key="post.id" class="post border-gray-400 border-b mb-12">
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
          <g-link :to="post.node.path" class="font-bold uppercase">Read post</g-link>
        </div>
      </article> <!-- end post -->

      <pagination-posts
        v-if="$page.posts.pageInfo.totalPages > 1"
        base="/blog"
        :totalPages="$page.posts.pageInfo.totalPages"
        :currentPage="$page.posts.pageInfo.currentPage"
      />
    </div>
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allPost (sortBy: "date", order: DESC, perPage: 5, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        description
        date (format: "MMMM D, Y")
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
  metaInfo() {
    var meta = {
        title: 'Blog',
        meta: [
          { name: 'description', content: `Blog post articles listing page ${this.$page.posts.pageInfo.currentPage} of ${this.$page.posts.pageInfo.totalPages}` }
        ]
    };

    if(this.$page.posts.pageInfo.currentPage == 1) {
        meta.links = [
            { rel: "canonical", href: "http://chowson.github.io/" }
        ]
    }

    return meta;
  },
  components: {
    PaginationPosts
  }
}
</script>
