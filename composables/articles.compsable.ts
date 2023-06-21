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

    async function get(params: GetArticlesParams) {
        startLoading();

        return $api.article.getArticleOk(params)
        .then(response => {
            articles.value = response.data?.articles;
            articlesCount.value = response.data?.articlesCount as number;

            return articles;
        })
        .finally(() => endLoading() );
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
        startLoading();
        return $api.article.getTags()
        .then((response) => {
            tags.value = response.tags;
        })
        .finally(() => endLoading() );
    }


    return {
        get,
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