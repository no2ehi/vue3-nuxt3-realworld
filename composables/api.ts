// import { Ref } from '@vue/runtime-dom'
// import type { NitroFetchRequest } from 'nitropack'
// import { KeyOfRes } from 'nuxt/dist/app/composables/asyncData'

// type UseFetchOptions = {
//   key?: string,
//   method?: string,
//   params?: any,
//   body?: RequestInit['body'] | Record<string, any>
//   headers?: { key: string, value: string },
//   baseURL?: string,
//   server?: boolean
//   lazy?: boolean
//   default?: () => DataT
//   transform?: (input: DataT) => DataT
//   pick?: KeyOfRes<(input: DataT) => DataT>
//   onRequest: () =>
// }

// interface DTOModel {
//   comments: any,
//   comments_count: number,
//   id: number,
//   points: number,
//   time: number,
//   title: string,
//   type: string,
//   url: string,
//   user: string,
// }

// type DataT = {
//   data: Ref<T>
//   pending: Ref<boolean>
//   refresh: () => Promise<void>
//   error: Ref<Error | boolean>
// }

// const config = useRuntimeConfig();

// export function request<T = any> (url: NitroFetchRequest | Ref<NitroFetchRequest> | (() => NitroFetchRequest), options?: UseFetchOptions): Promise<T> {
//   return new Promise((resolve) => {
//     // Default configuration and merge
//     const opts = {
//       // key: `${new Date().getTime()}`,
//       // method: 'GET',
//       // params: {},
//       // body: {},
//       baseURL: config.public.baseUrl,
//       server: true,
//       lazy: false,
//       // default: () => ({}),
//       // transform: (input: any) => input,
//       // pick: [],

//       onRequest({ options }: any) {
//         const token = useCookie('token') || null;
//         if (token.value) {
//             options.headers = {
//                 ...options.headers,
//                 Authorization: `Bearer ${token.value}`  
//             };
//         }
//       },
      
//       ...options
//     }
//     const { data, pending, error, refresh } = useFetch(url, opts)
//     // @ts-ignore
//     resolve({ data, pending, error, refresh })
//   })
// }

import { ApiResponse } from '~/repository/models/api.model';

export type ApiActionFn<T, U> = (input: T) => Promise<U>

export function useApi<T, U>(Fn: ApiActionFn<T, U>): Promise<ApiResponse<U>> {

    const config = useRuntimeConfig();

    const options = {

    baseURL: config.public.baseUrl,

    onRequest({ options }) {
      const token = useCookie('token') || null;
			if (token.value) {
				options.headers = {
					...options.headers,
					Authorization: `Bearer ${token.value}`  
				};
			}
		},

    }

    const { data, pending, error, refresh } = useFetch(url, options);

    return { data, pending, error, refresh };
}