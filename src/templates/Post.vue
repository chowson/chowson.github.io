<template>
  <Layout>
    <div class="container-inner mx-auto my-8">
      <article>
        <h1 class="text-4xl font-bold leading-tight">{{ $page.post.title }}</h1>
        <div class="text-xl text-gray-600">{{ $page.post.date }}</div>
        <div class="text-sm text-gray-600 mb-4">{{ $page.post.timeToRead }} min read</div>
        <div class="flex mb-8 text-sm">
          <g-link
            :to="tag.path"
            v-for="tag in $page.post.tags"
            :key="tag.id"
            class="bg-gray-300 rounded-full px-4 py-2 mr-4 text-brand-900 hover:bg-brand-300">
            {{ tag.title }}
          </g-link>
        </div>
        <div class="markdown-body mb-8" v-html="$page.post.content" />
        <div class="mb-6 pt-6 border-t-1 border-gray-600" v-if="$page.post.references.length > 0">
          <h4 class="text-xl">References</h4>
          <ul class="list-disc list-inside">
            <li v-for="reference in $page.post.references" :key="reference">
              <a class="external mb-1 inline-block" target="_blank" rel="noreferrer" :href="reference.split('|')[0]">{{ reference.split("|")[1] }}</a>
            </li>
          </ul>
        </div>
        <div class="mb-8 pt-2 border-t-3 border-double border-gray-600">
          <g-link to="/" class="font-bold uppercase">Back to Blog</g-link>
        </div>
      </article>
    </div>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    title
    description
    date (format: "MMMM D, Y")
    timeToRead
    content
    tags {
      title
      path
    }
    references
    path
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    if(this.$page && this.$page.post)
    {
      var publishedDate = new Date(this.$page.post.date);
      var formattedPublishedDate = `${publishedDate.getFullYear()}-${("0" + publishedDate.getMonth()).slice(-2)}-${("0" + publishedDate.getDate()).slice(-2)}`;

      return {
        title: this.$page.post.title,
        meta: [
          { name: 'description', content: this.$page.post.description },
        ],
        script: [
          {
            innerHTML: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "BlogPosting",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://chowson.github.io${this.$page.post.path}`
              },
              "headline": "headling",
              "author": {
                "@type": "Person",
                "name": "Chris Howson",
                "sameAs": "https://github.io/chowson"
              },
              "publisher": {
                "@type": "Organization",
                "name": "chowson.github.io",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://chowson.github.io/images/logo.png"
                }
              },
              "image": "https://chowson.github.io/images/logo.png",
              "dateCreated": formattedPublishedDate,
              "datePublished": formattedPublishedDate,
              "dateModified": formattedPublishedDate,
              "description": this.$page.post.description
            }),
            type: 'application/ld+json'
          }
        ]
      }
    }
  }
}
</script>

<style src="../css/github-markdown.css" />