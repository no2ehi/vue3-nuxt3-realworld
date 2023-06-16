import { Article, PaginatedArticles } from "~/repository/models/articles.model";
import { CreateArticleDTO, GetArticlesParams } from "~/repository/modules/articles.dto";
import { ArticlesRepository } from "~/repository/modules/articles.repository"

const articlesRepository = new ArticlesRepository;

export function useArticles() {

    const { startLoading, isLoading, endLoading } = useLoading();

    const articles = ref<Article[]>();
    const articlesCount = ref(0);
    const articlesIsLoading = computed(() => isLoading.value);

    const tags = ref<string[]>([]);
    const tagIsLoading = computed(() => isLoading.value);

    async function get( params: GetArticlesParams) {
        startLoading();
        articlesRepository.getArticles(params).then((response) => {
                articles.value = response.data?.articles;
                articlesCount.value = response.data?.articlesCount as number;
                return articles.value;
        })
        .finally(() => endLoading())
    }

    async function create( article: CreateArticleDTO) {
        startLoading();
        articlesRepository.createArticle(article).then((response) => {
            console.log(response);
        })
        .finally(() => endLoading())
    }

    async function getTags() {
        startLoading();
        articlesRepository.getTags().then((response) => {
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
    }
}