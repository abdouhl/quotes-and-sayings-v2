<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'

import useLozad from '../composables/useLozad'

import { IQuote } from '../types.d'
import { generateQuoteMeta } from '../utils/meta'

const route = useRoute()
const { reObserver } = useLozad('img.lozad')

useHead({
  title: 'أقوال و اقتباسات',
  meta: [
    { name: 'title', content: 'أقوال و اقتباسات' },
    { name: 'description', content: 'مجموعة منتقاة بعناية من الاقتباسات الملهمة من مشاهير ورياضيين وسياسيين ومؤلفين'  },
    { name: 'robots', content: "index, follow" },
  ],
  script: [
    {src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3610150616518651',async:'',crossorigin: "anonymous"}
  ]
})
function loadAd() {
  var message = document.createElement("script");
  var alert = document.createTextNode("(adsbygoogle = window.adsbygoogle || []).push({});");
  message.appendChild(alert);
  document.body.appendChild(message);	
}


const quote = route.meta.quote

onMounted(() => {
  reObserver()
  loadAd()
})
</script>

<template>
    <app-hero title="أقوال و اقتباسات" />
    <div class="flex flex-col items-center justify-center">
      <div v-if="!!quote" class="flex flex-col w-11/12 md:w-6/12 mb-[86px]">
        <div class="grid grid-flow-row-dense grid-cols-1 gap-5 md:gap-6 xl:gap-8">
          <quote-card :quote="quote" size="xl" class="z-20 p-3" />
        </div>
      </div>
    </div>
    <section dir="rtl" class="w-full flex flex-col items-center justify-center gap-2 md:gap-8 mty2 md:my-8 px-2 md:px-24 lg:px-36 text-slate-700" >
      <ins  class="adsbygoogle  w-11/12 md:w-6/12 mb-[86px]"
       style="display:block; text-align:center;"
       data-ad-layout="in-article"
       data-ad-format="fluid"
       data-ad-client="ca-pub-3610150616518651"
       data-ad-slot="9731162583">
      </ins>
    </section>
</template>

<style>
/*.adsbygoogle {
  border: 1px solid red;
}*/
.quote-card--page-view {
  @apply md:hover:rotate-0;
}
</style>
