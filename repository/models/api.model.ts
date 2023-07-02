export interface ErrorT {
    [key: string]: string[]
  }
  
  export interface ApiResponse<DataT> {
    data: Ref<DataT | null>
    pending: Ref<boolean>
    refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
    error: Ref<ErrorT | null>
  }

  interface AsyncDataExecuteOptions {
    dedupe?: boolean
  }

  export interface ApiResponseFetch<T> {
    data?: T
  }

  export type Paginated<T, Collection extends string> = {
    [P in Collection]: T
  } & {
    [P in Collection as `${P}Count`]: number
  }