<script setup lang="ts">
import { search, count } from '../composables/useSearch'

const clearSearch = () => {
  search.value = ''
}
</script>

<template>
  <div dir="rtl" class="search-wrapper">
    <div class="search-container">
      <div class="search-main">
        <quotes-filter />

        <i-heroicons-solid-search class="search-main--icon" />

        <div class="search-main--action">
          <span class="action-badge">
            <b>{{ count }}</b>
            <span class="mr-1">مقولة</span>
          </span>
          <button v-if="search.length > 0" class="action-badge" @click="clearSearch">
            <i-mdi-close-circle-outline class="inline-block" />
            <span class="ml-1">حذف</span>
          </button>
        </div>

        <input v-model="search" class="search-main--input" type="text" placeholder="بحث">
      </div>
    </div>
  </div>
</template>

<style>
.search-wrapper {
  @apply flex flex-col items-center justify-center;
}
.search-container {
  @apply w-11/12 md:w-3/4 mb-8 p-1 relative;
}
.search-main {
  @apply flex justify-between items-center rounded-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 dark:focus-within:ring-offset-gray-800 focus-within:ring-indigo-500;
}
.search-main--icon {
  @apply absolute text-gray-600 dark:text-gray-100 top-1/2 -translate-y-1/2 right-[62px] md:right-[118px];
}
.search-main--action {
  @apply flex absolute left-1 text-left z-10;
}
.search-main--action .action-badge {
  @apply text-[11px] leading-[20px] py-0 px-[7px] inline-flex items-center ml-2 md:ml-3 rounded-xl ring-1 text-purple-800 dark:text-purple-400 ring-purple-300 bg-[#e0daf8] dark:bg-[#1c2332];
}
.search-main--input {
  @apply pr-9 pl-4 py-2 border border-r-0 bg-gray-100 focus:bg-gray-50 border-gray-300 text-sm rounded-r-none rounded-l-md w-full transition appearance-none outline-none dark:bg-gray-900 dark:text-gray-100 dark:border-gray-500;
}
</style>
