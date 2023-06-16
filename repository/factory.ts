import { $Fetch, $fetch, FetchOptions } from 'ofetch'
// import { injectToken } from './interceptors/injectToken.interceptor';


export function createFetchIstance(authenticated = true): $Fetch {
  
  const fetchOptions: FetchOptions = {
    baseURL: 'https://api.realworld.io/api',
  }

  console.log(useCookie('token'))


  const apiFetcher = $fetch.create(fetchOptions);

  return apiFetcher;
}
