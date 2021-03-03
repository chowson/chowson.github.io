// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Hero from '~/components/Hero.vue'
import VueFuse from 'vue-fuse'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('Hero', Hero)

  Vue.use(VueFuse);

  const googleFonts = "https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap";

  head.link.push({
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
    crossorigin: ''
  });

  head.link.push({
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossorigin: ''
  });

  head.link.push({
    rel: 'preconnect',
    href: 'https://www.google-analytics.com',
    crossorigin: ''
  })

  head.link.push({
    rel: 'preload',
    as: 'style',
    href: googleFonts
  });

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap',
    media: 'print',
    onload: 'this.media=\'all\''
  });

  head.meta.push(
    { name: 'theme-color', content: '#2F855A' }
  );
}
