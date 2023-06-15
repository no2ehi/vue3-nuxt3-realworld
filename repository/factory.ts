import { $Fetch, $fetch, FetchOptions } from 'ofetch'

export function createFetchIstance(): $Fetch {

  const fetchOptions: FetchOptions = {
    baseURL: 'https://api.realworld.io/api',
  }

  /** create a new instance of $fetcher with custom option */
  const apiFetcher = $fetch.create(fetchOptions);

  return apiFetcher;
}


class HttpFactory {
  private $fetch: $Fetch;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
    this.$fetch.create(this.fetchOptions);
  }

  private fetchOptions: FetchOptions = {
    baseURL: 'https://api.realworld.io/api',
  }

  /** create a new instance of $fetcher with custom option */

  /** 
    * method - GET, POST, PUT
    * URL
  **/
  async call<T>(method: string, url: string, data?: object, extras = {}): Promise<T> {
    const $res: T = await this.$fetch(url, { method, body: data, ...extras });
    return $res;
  }
}

export default HttpFactory;