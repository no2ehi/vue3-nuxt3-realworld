import { Article } from "~/repository/models/articles.model";
import { CreateArticleDTO, GetArticlesParams } from "~/repository/modules/articles.dto";

export function useArticles() {

    const { $api } = useNuxtApp();

    const { startLoading, isLoading, endLoading } = useLoading();

    const articles = ref<Article[]>();
    const articlesCount = ref(0);
    const articlesIsLoading = computed(() => isLoading.value);

    const article = ref<Article>();
    const articleIsLoading = computed(() => isLoading.value);

    const tags = ref<string[]>([]);
    const tagIsLoading = computed(() => isLoading.value);

    async function getArticles(params: GetArticlesParams) {
        return await useAsyncData(() => $api.article.getArticleOk(params));
    }

    async function getBySlug(slug: string) {
        startLoading();

        return $api.article.getBySlug(slug)
        .then(response => {
            article.value = response as Article;

            return article.value;
        })
        .finally(() => endLoading());
    }

    async function create( article: CreateArticleDTO) {
        startLoading();
        
        return $api.article.createArticleOk(article)
        .then( response => {

            return response;
        })
        .finally(() => endLoading());
    }

    async function update( slug: string, article: CreateArticleDTO) {
        startLoading();
        
        return $api.article.updateArticle(slug, article)
        .then( response => {

            return response;
        })
        .finally(() => endLoading());
    }

    async function deleteArticle( slug: string) {
        startLoading();
        
        return $api.article.deletArticle(slug)
        .then( response => {
            return response;
        })
        .finally(() => endLoading());
    }

    async function getTags() {
        return await useAsyncData(() => $api.article.getTags());
    }


    return {
        getArticles,
        articles,
        articlesCount,
        articlesIsLoading,
        getTags,
        tags,
        tagIsLoading,
        create,
        update,
        deleteArticle,
        getBySlug,
        articleIsLoading,
        article
    }
}