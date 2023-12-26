import { RouteRecordRaw } from 'vue-router'
import { IQuote } from './types'
import { quoteRouteLists , authorRouteLists } from './utils/routes'

import QuoteGallery from './views/QuoteGallery.vue'
import QuoteNotFound from './views/QuoteNotFound.vue'

declare module 'vue-router' {
  interface RouteMeta {
    quote?: IQuote
    author_quotes?: IQuote
    author_name?: string
  }
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'quote-gallery',
    component: QuoteGallery,
  },
  ...quoteRouteLists,
  {
    path: '/404',
    name: 'not-found',
    component: QuoteNotFound,
  },
  ...authorRouteLists,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
