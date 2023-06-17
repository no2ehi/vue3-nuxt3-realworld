import { Article, PaginatedArticles } from "~/repository/models/articles.model";
import { CreateArticleDTO, GetArticlesParams } from "~/repository/modules/articles.dto";
import { ArticlesRepository } from "~/repository/modules/articles.repository"

// const articlesRepository = new ArticlesRepository;

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
            article.value = response.data;

            return article.value;
        })
        .finally(() => endLoading());
    }

    async function create( article: CreateArticleDTO) {
        startLoading();
        
        return $api.article.createArticleOk(article)
        .then( response => {
            console.log(response);
        })
        .finally(() => endLoading());
    }

    async function getTags() {
        startLoading();
        return $api.article.getTags()
        .then((response) => {
            tags.value = response.data?.tags;
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
        getBySlug,
        articleIsLoading,
        article
    }
}