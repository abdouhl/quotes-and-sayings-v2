import { RouteRecordRaw } from 'vue-router'

import quotes from '../assets/quotes.json'
import QuotePage from '../views/QuotePage.vue'
import AuthorPage from '../views/AuthorPage.vue'
import { IQuote } from '../types.d'

export const quoteRouteLists: RouteRecordRaw[] = (quotes as IQuote[]).map((quote) => {
  return {
    path: `/quote/${quote.slug}`,
    name: `quote-page-${quote.id}`,
    component: QuotePage,
    meta: {
      quote,
    },
  }
})

export const authorRouteLists: RouteRecordRaw[] = (quotes as IQuote[]).map((quote) => {
  return {
    path: `/quote/${quote.slug}`,
    name: `quote-page-${quote.id}`,
    component: AuthorPage,
    meta: {
      quote,
    },
  }
})
