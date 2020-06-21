<template>
  <nav class="flex justify-between text-xl items-center">
    <span v-if="!showPreviousPage"></span>
    <g-link
      v-else
      rel="prev"
      :to="previousPage"
      exact
      :class="{ 'text-gray-400 hover:text-gray-400 cursor-not-allowed': !showPreviousPage }">&larr; Prev</g-link>
    <div class="text-base">Page {{ currentPage }} of {{ totalPages }}</div>
    <g-link
      rel="next"
      :to="nextPage"
      active
      :class="{ 'text-gray-400 hover:text-gray-400 cursor-not-allowed': !showNextPage }">Next &rarr;</g-link>
  </nav>
</template>

<script>
export default {
  props: ['base', 'totalPages', 'currentPage'],
  computed: {
    showPreviousPage() {
      return this.currentPage !== 1
    },
    previousPage() {
      return [0, 1].includes(this.currentPage - 1)
        ? '/'
        : `${this.getBaseUrl}/${this.currentPage - 1}`;
    },
    showNextPage() {
      return this.currentPage !== this.totalPages
    },
    nextPage(currentPage, totalPages) {
      return this.totalPages > this.currentPage
        ? `${this.getBaseUrl}/${this.currentPage + 1}`
        : `${this.getBaseUrl}/${this.currentPage}`;
    },
    getBaseUrl() {
      return this.base.endsWith('/')
        ? this.base.replace(/\/$/, "")
        : this.base;
    }
  }
}
</script>