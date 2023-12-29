<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { debouncedWatch, useThrottleFn } from '@vueuse/core'
import { useHead } from '@vueuse/head'

import { IQuote, SearchType } from '../types.d'
import { chunk } from '../utils/helpers'

import quotesRaw from '../assets/quotes.json'

import { search, filter, type, count, searchFilter, favoriteFilter } from '../composables/useSearch'
import { isFavoriteShow, favoriteLists } from '../composables/useFavorite'
import useDialog from '../composables/useDialog'
import useLozad from '../composables/useLozad'

const CHUNKED_SIZE = 8

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


const allQuotes = ref<IQuote[]>((quotesRaw as IQuote[]))
let quotesChunked = chunk(([] as IQuote[]), CHUNKED_SIZE)

const quotes = ref<IQuote[]>([])
const quotesIndex = ref(0)
const galleryElement = ref<HTMLDivElement>()

const { reObserver } = useLozad('img.lozad')
const { isShowDialog, selectedQuote, showDialog, closeDialog } = useDialog()

const isEmpty = computed(() => (quotes.value.length === 0 && quotesIndex.value === 0))

function loadQuotes() {
  if (quotesIndex.value > (quotesChunked.length - 1)) return

  const quotesLists = quotesChunked[quotesIndex.value]

  if (quotes.value.length > 0) {
    quotes.value = [
      ...quotes.value,{
    "id": "pdsssssssssssssssssssssssssssssss",
    "text": "ليست قيمةُ الإنسان بما يبلغه، بل بما يتوقُ البلوغ إليه.",
  },
      ...quotesLists,
    ]
  }
}

function handleMainSearch() {
  nextTick(() => {
    const filtered = searchFilter(allQuotes.value)

    applyfilteredQuotes(filtered)
  })
}
function handleFavoriteSearch() {
  nextTick(() => {
    const filtered = favoriteFilter(favoriteLists.value, allQuotes.value)

    applyfilteredQuotes(filtered)
  })
}

function applyfilteredQuotes(filtered: IQuote[], withObserver = true) {
  quotesChunked = chunk(filtered, CHUNKED_SIZE)
  quotesIndex.value = 0
  count.value = filtered.length
  quotes.value = quotesChunked[0] || []

  if (withObserver) reObserver()
}

const handleScroll = useThrottleFn(() => {
  if (!galleryElement.value) return

  if (galleryElement.value.getBoundingClientRect().bottom < (window.innerHeight + 800)) {
    if (quotesIndex.value < (quotesChunked.length - 1)) {
      quotesIndex.value = quotesIndex.value + 1

      loadQuotes()
      reObserver()
    }
  }
}, 100)

watch([isFavoriteShow, favoriteLists], () => {
  if (isFavoriteShow.value) {
    type.value = SearchType.Favorite

    handleFavoriteSearch()
  }
  else {
    type.value = SearchType.Main

    handleMainSearch()
  }
})

debouncedWatch([search, filter], () => {
  if (type.value === SearchType.Favorite)
    handleFavoriteSearch()

  else
    handleMainSearch()
}, { debounce: 100 })

applyfilteredQuotes(allQuotes.value, false)

onMounted( () => {
  window.addEventListener('scroll', handleScroll)
  reObserver()
	var message = document.createElement("script");
  var alert = document.createTextNode("(adsbygoogle = window.adsbygoogle || []).push({});");
  message.appendChild(alert);
  document.body.appendChild(message);	
})

onMounted(() => {

})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <app-hero title="أقوال و اقتباسات" />
  <section dir="rtl" class="w-full gap-2 md:gap-8 mty2 md:my-8 px-2 md:px-24 lg:px-36 text-slate-700" >
    <ins  class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-3610150616518651"
     data-ad-slot="9731162583">
    </ins>
  </section>
  <div>
    <quote-dialog :quote="selectedQuote" :show="isShowDialog" @close="closeDialog" />

    <quote-search />

    <div ref="galleryElement" class="flex flex-col items-center justify-center">
      <div class="w-11/12 md:w-3/4 mb-[86px]">
        <div class="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
          
          <section
            v-for="quote in quotes"
            :key="quote.id"
            class="quote-card--container flex cursor-pointer"
            :class="{'md:col-span-2': quote.text.length > 150}"
            @click.stop="showDialog(quote, $event)"
          >
          
            <quote-card v-if="!(quote.id === 'pdsssssssssssssssssssssssssssssss')" :quote="quote" />
            <ins  v-if="quote.id === 'pdsssssssssssssssssssssssssssssss'" class="adsbygoogle quote-card--container flex cursor-pointer w-full"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-3610150616518651"
     adsense_ui_features="rc:10"
     data-ad-slot="9731162583">
    </ins>
          </section>
          
        </div>
      </div>
    </div>
  </div>
  
</template>

<style>
/*.adsbygoogle {
  border: 1px solid red;
}*/
</style>
