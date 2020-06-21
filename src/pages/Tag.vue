<template>
  <Layout>
    <section class="container-inner mx-auto my-8">
      <h1 class="text-4xl font-bold leading-tight">Tags</h1>
      <p class="text-xl text-gray-600 mt-4">Browse posts by tag</p>
      <ul
          class="ml-8 text-xl uppercase tracking-wide font-bold w-full block flex-grow space-y-8 items-center mt-10"
      >
        <li v-for="tag in this.$static.tags.edges" :key="tag.title">
          <g-link :to="tag.node.path" class="checkmark">{{tag.node.title}}</g-link>
        </li>
      </ul>
    </section>
  </Layout>
</template>

<static-query>
query Tags {
  tags: allTag (sortBy: "title", order: ASC) {
    totalCount
    edges {
      node {
        title
        path
      }
    }
  }
}
</static-query>

<script>
export default {
  metaInfo: {
    title: 'Tags'
  }
}
</script>
