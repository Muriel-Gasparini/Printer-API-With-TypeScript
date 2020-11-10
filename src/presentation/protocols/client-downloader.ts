export interface responseClientDownloader {
  message: string
  isError: boolean
  data?: any
}

export interface ClientDownloader {
  download: (data: any) => responseClientDownloader
}
