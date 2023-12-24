<script setup lang="ts">
import { ref, toRef, computed, withDefaults } from 'vue'

import { IQuote } from '../types'
import { isValidLink } from '../utils/helpers'
import { gradients } from '../utils/gradients'

import useSaveCard from '../composables/useSaveCard'
import { isFavorite, toggleIsFavorite } from '../composables/useFavorite'

const props = withDefaults(defineProps<{
  quote: IQuote
  size?: string
}>(), {
  size: 'sm',
})

const quote = toRef(props, 'quote')
const size = toRef(props, 'size')

const { card, saveCard } = useSaveCard()

const isFavorited = computed(() => isFavorite(quote.value.id))

function getGradientByIndex(index = 0) {
  return gradients[index]
}
</script>

<template>
  <div  ref="card" class="w-full relative text-white overflow-hidden flex rounded-3xl shadow-lg p-2" :class="`card-size--${size} ` + getGradientByIndex(quote.gradient_id)">
    <div class="w-full flex flex-col dark:bg-gray-800 dark:rounded-2.2xl">
      <div class="card-content flex flex-col items-start relative p-6 xl:p-8">
        <a v-if="(size === 'sm')" :href="`/quote/${quote.slug}`" target="_blank" class="absolute top-4 right-6 p-2 rounded-full hover:bg-black hover:bg-opacity-25 dark:hover:bg-gray-600 transition-colors hide-on-save button-save cursor-pointer" @click.stop>
          <i-mdi-open-in-new />
        </a>

        <h2 class="card-content--icon flex-1">
          <i-ri-double-quotes-l />
        </h2>
        <p dir="rtl" class="card-content--text">
          {{ quote.text }}
        </p>
        
      </div>
      <div dir="rtl" class="mt-auto p-6 pt-1">
        <div class="flex items-center">

          <div class="flex flex-col flex-1">
            <div>
              <p dir="rtl" v-if="isValidLink(quote.author_detail_url)" class="card-content--author font-bold text-m text-gray-100">
          - <a :href="quote.author_detail_url" target="_blank" :title="`Read more about ${quote.author}`" rel="noreferrer noopener" class="pb-1 hover:border-b-2 hover:border-gray-200">{{ quote.author }}</a>
        </p>
        <p dir="rtl" v-else class="card-content--author text-sm md:whitespace-nowrap text-gray-100">
          - {{ quote.author }}
        </p>
            </div>
          </div>

          <div class="flex">
            <div class="p-2 rounded-full hover:bg-black hover:bg-opacity-25 transition-colors hide-on-save button-favorite cursor-pointer" :class="{ 'dark:text-red-500 dark:hover:bg-red-500 dark:hover:bg-opacity-20': isFavorited }" title="Jadikan sebagai yang di favoritkan" @click.stop="toggleIsFavorite(quote.id)">
              <i-ri-heart-2-fill v-if="isFavorited" />
              <i-ri-heart-2-line v-else />
            </div>

            <div v-if="(size === 'lg' || size === 'xl')" class="p-2 rounded-full hover:bg-black hover:bg-opacity-25 dark:hover:bg-gray-600 transition-colors hide-on-save button-save cursor-pointer" title="Simpan quote menjadi gambar" @click.stop="saveCard">
              <i-ri-save-line />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-size--sm {
  @apply md:hover:rotate-1 md:hover:scale-105 duration-300;
}
.card-size--lg {
  @apply md:scale-150 md:hover:scale-150;
}

.card-content .card-content--icon {
  @apply text-xl font-semibold mb-2;
}
.card-content .card-content--text {
  @apply font-medium text-white mb-4;
}
.card-size--sm .card-content .card-content--text {
  @apply text-lg;
}
.card-size--lg .card-content .card-content--text {
  @apply text-xl md:text-lg;
}
.card-size--xl .card-content .card-content--icon,
.card-size--xl .card-content .card-content--text {
  @apply text-xl md:text-[1.875em] leading-relaxed;
}
.card-size--xl .card-content .card-content--author {
  @apply text-base md:text-xl;
}
</style>
