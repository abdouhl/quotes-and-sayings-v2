import { IQuote, IMeta } from '../types'

function generateMeta({ title, description, url }: IMeta) {
  return [
    {
      name: 'title',
      content: title,
    },
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:title',
      content: description,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:url',
      content: url,
    },
    {
      property: 'twitter:title',
      content: description,
    },
    {
      property: 'twitter:description',
      content: description,
    },
    {
      property: 'twitter:url',
      content: url,
    },
  ]
}

export function generateQuoteMeta(quote: IQuote) {
  const title = `${quote.author}أفضل أقوال `
  const description = `"${quote.text}" - ${quote.author}`
  const url = `https://www.quotesandsayings.net/quote/${quote.slug}`

  return {
    title,
    meta: generateMeta({
      title,
      description,
      url,
    }),
  }
}

export function generateIndexMeta() {
  const title = 'Quotes — Every Day Inspirasional Quotes'
  const description = 'Website sederhana yang menampilkan Kutipan Inspirasional secara acak. Website ini menampilkan kutipan yang submit oleh para kontributor terbuka dan para peserta event Hacktoberfest 2021. Dapatkan kutipan yang membuatmu tetap termotivasi!'
  const url = 'https://quotes.nyan.my.id'

  return {
    title,
    meta: generateMeta({
      title,
      description,
      url,
    }),
  }
}
