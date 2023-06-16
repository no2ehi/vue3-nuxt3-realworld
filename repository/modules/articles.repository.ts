import { createFetchIstance } from "../factory";
import { ApiResponseFetch } from "../models/api.model";
import { Article, PaginatedArticles } from "../models/articles.model";
import { ArticleDTO, CreateArticleDTO, GetArticlesParams, PaginatedArticlesDTO, SingleArticleResponse, toDomainArticle, toDomainPaginatedArticles } from "./articles.dto";

const httpClient = createFetchIstance();

export class ArticlesRepository {

    private BASE_PATH = '/articles';


    async getArticles( params: GetArticlesParams): Promise<ApiResponseFetch<PaginatedArticles>> {
        const result = await httpClient<ApiResponseFetch<PaginatedArticlesDTO>>(
            (this.BASE_PATH),
        {
            method: 'GET',
            params
        });

        return {
            ...result,
            data: toDomainPaginatedArticles(result as PaginatedArticlesDTO)
        }
    }

    async createArticle(article: CreateArticleDTO): Promise<ApiResponseFetch<Article>> {
        const result = await httpClient<ApiResponseFetch<SingleArticleResponse>>(
            this.BASE_PATH,
            {
                method: 'POST',
                body: { article }
            }
        );

        return {
            ...result,
            data: toDomainArticle(result.data?.article as ArticleDTO)
        }
    }

    async getTags(): Promise<ApiResponseFetch<string[]>> {
        const result = await httpClient<ApiResponseFetch<string[]>>(
            '/tags', 
        {
            method: 'GET',
        });
        return {
            data: result as string[]
        }
    }


}