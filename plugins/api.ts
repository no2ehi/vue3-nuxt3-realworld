import { $fetch, FetchOptions } from 'ofetch';
import { defineNuxtPlugin } from '#app';
import UsersRepository from '~~/repository/modules/users.repository';
import { ArticlesRepository } from '~/repository/modules/articles.repository';

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
  auth: UsersRepository,
  article: ArticlesRepository
}

export default defineNuxtPlugin((nuxtApp) => {

  const fetchOptions: FetchOptions = {
    baseURL: 'https://api.realworld.io/api',
  }

  const token = useCookie('token');
  
  if(token.value) {
    fetchOptions.headers = {
        Authorization: `Bearer ${token.value}`
    }
  }

  if (process.server) {
    // Code executed on the server-side
    console.log("Running on the server-side");
  } else {
    // Code executed on the client-side
    console.log("Running on the client-side");
  }
  
  /** create a new instance of $fetcher with custom option */
  const apiFetcher = $fetch.create(fetchOptions);

  /** an object containing all repositories we need to expose */
  const modules: IApiInstance = {
    auth: new UsersRepository(apiFetcher),
    article: new ArticlesRepository(apiFetcher)
  };

  return {
    provide: {
      api: modules,
    },
  };
});