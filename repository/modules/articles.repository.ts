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

    async getBySlug(slug: string): Promise<Article> {
        const result = await this.call<SingleArticleResponse>(
            'GET',
            `${this.BASE_PATH}/${slug}`,
        );
        
        return toDomainArticle(result.article)
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


    async getTags(): Promise<string[]> {
        const result = await this.call<string[]>(
            'GET',
            '/tags'
        )
        return result;
    }


}