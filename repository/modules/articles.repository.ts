import HttpFactory from "../factory";
import { ApiResponseFetch } from "../models/api.model";
import { Article, PaginatedArticles } from "../models/articles.model";
import { ArticleDTO, CreateArticleDTO, GetArticlesParams, PaginatedArticlesDTO, SingleArticleResponse, toDomainArticle, toDomainPaginatedArticles } from "./articles.dto";

export class ArticlesRepository extends HttpFactory {

    private BASE_PATH = '/articles';

    async getArticleOk(params: GetArticlesParams): Promise<ApiResponseFetch<PaginatedArticles>> {
        const result = await this.call<ApiResponseFetch<PaginatedArticlesDTO>>(
            'GET',
            this.BASE_PATH,
            undefined,
            {
                params
            }
        );

        return {
            ...result,
            data: toDomainPaginatedArticles(result as PaginatedArticlesDTO)
        }
    }

    async getBySlug(slug: string): Promise<ApiResponseFetch<Article>> {
        const result = await this.call<ApiResponseFetch<SingleArticleResponse>>(
            'GET',
            `${this.BASE_PATH}/${slug}`,
        );
        
        return {
            data: toDomainArticle(result as ArticleDTO)
        }
      } 

    async createArticleOk(article: CreateArticleDTO): Promise<ApiResponseFetch<Article>> {
        const result = await this.call<ApiResponseFetch<SingleArticleResponse>>(
            'POST',
            this.BASE_PATH,
            {article}
        );

        return {
            ...result,
            data: toDomainArticle(result.data?.article as ArticleDTO)
        }
    }


    async getTags(): Promise<ApiResponseFetch<string[]>> {
        const result = await this.call<ApiResponseFetch<string[]>>(
            'GET',
            '/tags'
        )
        return {
            data: result as string[]
        }
    }


}