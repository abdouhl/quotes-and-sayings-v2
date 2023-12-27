interface IGithubProfile {
  available: boolean
  name: string
  avatar_url?: string
  followers?: number
}
export interface IQuote {
  id: string
  username: string
  github?: IGithubProfile
  gradient_id: number
  slug: string
  auth_slug: string
  text: string
  author: string
  author_detail_url?: string
  created_at?: string
  created?: string
}
export interface IMeta {
  title: string
  description: string
  url: string
}

export interface IScript {
  src: string
  async: string
  crossorigin: string
}


export enum Theme {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}
export enum SearchType {
  Main = 'main',
  Favorite = 'favorite',
}
