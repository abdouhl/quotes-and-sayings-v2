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

var authors =[ ...new Set((quotes as IQuote[]).map((quote) => {return quote.auth_slug}))]


export const authorRouteLists: RouteRecordRaw[] = (authors).map((author) => {
  var author_quotes = (quotes as IQuote[]).filter((quote) => quote.auth_slug === author)
  return {
    path: `/author/${author}`,
    name: `author-page-${author}`,
    component: AuthorPage,
    meta: {
      author_quotes,
      author,
    },
  }
})
