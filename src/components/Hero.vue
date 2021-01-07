<template>
    <section class="hero container-inner mx-auto flex flex-col sm:flex-row justify-between sm:py-4 lg:py-16">
      <h1
        class="font-bold w-full sm:w-3/5 text-center sm:text-left"
        :class="[large ? 'text-4xl' : 'text-3xl']">
        <div class="leading-tight">{{ leadingText }}</div>
        <div class="text-brand-700 leading-tight">{{ leadingTight }}</div>
      </h1>
      <div class="mt-8 sm:mt-0">
        <g-image v-if="large"
            src="../../static/images/code-review.svg" width="250" height="190" alt="hero" class="mx-auto sm:mx-0" />
        <g-image v-else
            src="../../static/images/code-review.svg" width="160" alt="hero" class="mx-auto sm:mx-0" />
      </div>
    </section>
</template>

<script>
export default {
    name: 'Hero',
    props: {
        leadingText: {
            type: String,
            default: "chowson.github.io"
        },
        leadingTight: {
            type: String,
            default: "Sitecore, C# & ASP.NET Development Blog"
        },
        large: {
            type: Boolean,
            default: true
        }
    }
}
</script>