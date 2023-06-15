import { createFetchIstance } from "../factory";
import { ApiResponseFetch } from "../models/api.model";
import { PaginatedArticles } from "../models/articles.model";
import { ArticleDTO, GetArticlesParams, PaginatedArticlesDTO, toDomainArticle, toDomainPaginatedArticles } from "./articles.dto";

const httpClient = createFetchIstance();

export class ArticlesRepository {

    private BASE_PATH = '/articles';


    async getArticles( params: GetArticlesParams): Promise<ApiResponseFetch<PaginatedArticles>> {
        console.log('params', params);

        const result = await httpClient<ApiResponseFetch<PaginatedArticlesDTO>>((this.BASE_PATH),
        {
            method: 'GET',
            params
        });

        return {
            ...result,
            data: toDomainPaginatedArticles(result as PaginatedArticlesDTO)
        }
}


}