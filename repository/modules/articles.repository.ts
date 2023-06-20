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

    async createArticleOk(article: CreateArticleDTO): Promise<Article> {
        const result = await this.call<SingleArticleResponse>(
            'POST',
            this.BASE_PATH,
            {article}
        );
        return toDomainArticle(result.article);
    }

    async updateArticle(slug: string, article: CreateArticleDTO): Promise<Article> {
        const result = await this.call<SingleArticleResponse>(
            'PUT',
            `${this.BASE_PATH}/${slug}`,
            {article}
        );
        return toDomainArticle(result.article);
    }

    async deletArticle(slug: string): Promise<undefined> {
        return await this.call<undefined>(
            'DELETE',
            `${this.BASE_PATH}/${slug}`,
        );
    }


    async getTags(): Promise<string[]> {
        const result = await this.call<string[]>(
            'GET',
            '/tags'
        );

        return result;
    }


}