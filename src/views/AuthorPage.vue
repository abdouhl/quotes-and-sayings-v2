<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import useDialog from '../composables/useDialog'
import useLozad from '../composables/useLozad'

import { IQuote } from '../types.d'
import { generateAuthorMeta } from '../utils/meta'

const route = useRoute()
const { reObserver } = useLozad('img.lozad')

useHead(generateAuthorMeta(route.meta.author_quotes[0]))

const quotes = ref<IQuote>(route.meta.author_quotes)

onMounted(() => {
  reObserver()
})
const { isShowDialog, selectedQuote, showDialog, closeDialog } = useDialog()
</script>

<template>
<app-hero :title="`أقوال `" />
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
            <quote-card :quote="quote" />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.quote-card--page-view {
  @apply md:hover:rotate-0;
}
</style>
