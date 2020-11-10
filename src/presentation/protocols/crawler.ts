export interface responseCrawler {
  message: string
  isError: boolean
}

export interface Crawler{
  print: (url: string) => Promise<responseCrawler>
}
