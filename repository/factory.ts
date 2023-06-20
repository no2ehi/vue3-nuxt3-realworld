import { $Fetch } from 'ofetch';


class HttpFactory {
  private $fetch: $Fetch;
  public token: string;

  constructor(fetcher: $Fetch, token: string = null) {
    this.$fetch = fetcher;
    this.token = token;
  }

  /** 
    * method - GET, POST, PUT
    * URL
  **/
  async call<T>(method: string, url: string, data?: object, extras = {}): Promise<T> {
    const fetchToken = this.token;
    const $res: T = await this.$fetch(
      url, 
      { 
        method,
        body: data,
        ...extras,

        onRequest({ options }) {
          if (fetchToken) {
            options.headers = {
              ...options.headers,
              Authorization: `Bearer ${fetchToken}`,
            };
          }
        },
      
        async onResponse({ request, response, options }) {
          const serverToken = response._data?.user?.token;
          // Log response
          console.log('[fetch response]', serverToken)
        }

      });
    return $res;
  }
}

export default HttpFactory;