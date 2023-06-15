import { Article, PaginatedArticles } from "~/repository/models/articles.model";
import { GetArticlesParams } from "~/repository/modules/articles.dto";
import { ArticlesRepository } from "~/repository/modules/articles.repository"

const articlesRepository = new ArticlesRepository;

export function useArticles() {

    const { startLoading, isLoading, endLoading } = useLoading();

    const articles = ref<Article[]>();
    const articlesCount = ref(0);
    const articlesIsLoading = computed(() => isLoading.value);

    async function get( params: GetArticlesParams) {
        startLoading();
        articlesRepository.getArticles(params).then((response) => {
                articles.value = response.data?.articles;
                articlesCount.value = response.data?.articlesCount as number;
                // console.log(response.data?.articlesCount)
                return articles.value;
        })
        .finally(() => endLoading())
    }


    return {
        get,
        articles,
        articlesCount,
        articlesIsLoading
    }
}