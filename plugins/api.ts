import { $fetch, FetchOptions } from 'ofetch';
import { defineNuxtPlugin } from '#app';
import UsersRepository from '~~/repository/modules/users.repository';
import { ArticlesRepository } from '~/repository/modules/articles.repository';
import { CommentsRepository } from '~/repository/modules/comments.repository';

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
  auth: UsersRepository,
  article: ArticlesRepository,
  comment: CommentsRepository
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const fetchOptions: FetchOptions = {
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
  
  /** create a new instance of $fetcher with custom option */
  const apiFetcher = $fetch.create(fetchOptions);

  /** an object containing all repositories we need to expose */
  const modules: IApiInstance = {
    auth: new UsersRepository(apiFetcher),
    article: new ArticlesRepository(apiFetcher),
    comment: new CommentsRepository(apiFetcher)
  };

  return {
    provide: {
      api: modules,
    },
  };
});