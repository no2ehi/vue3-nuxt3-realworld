<template>
    <div class="home-page">
    <div class="banner">
        <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
        </div>
    </div>

    <div class="container page">
        <div class="row">
        <div class="col-md-9">
            <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                    <NuxtLink class="nav-link disabled"  to="/">
                        Your Feed
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link active"  to="/">
                        Global Feed
                    </NuxtLink>
                </li>
            </ul>
            </div>

        <Loading v-if="articleIsLoading" color="#5cb85c" >loading Articles...</Loading>
        <div v-else v-for="article in articles" :key="article.slug"  class="article-preview">
            <div class="article-meta">
                <NuxtLink :to="`/@${article.author.username}`">
                    <img :src="article.author.image" :alt="article.author.username" />
                </NuxtLink>
                <div class="info">
                <NuxtLink :to="`/@${article.author.username}`" class="author">{{ article.author.username }}</NuxtLink>
                <span class="date">{{ moment(article.createdAt).format('LL') }}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
            </div>
            <NuxtLink :to="`article/${article.slug}`"  class="preview-link">
                <h1>{{ article.title }}</h1>
                <p>{{  article.description }}</p>
                <span>Read more...</span>
            </NuxtLink>
            </div>
        </div>

        <div class="col-md-3">
            <div class="sidebar">
                <p>Popular Tags</p>

                <Loading v-if="tagIsLoading" color="#5cb85c">tags loading...</Loading>
                <div v-else class="tag-list">
                    <li v-for="(tag, index) in tags" :key="index" class="tag-pill tag-default" >{{ tag }}</li>
                </div>
                </div>
            </div>
        </div>

        <div class="col-md-12 m-t-2" >
            <Transition>
                <div  class="flex items-center justify-center gap-1 mt-4">
                    <button class="btn button-page" :disabled="page === 1" @click="changePage(page - 1)">Previous</button>
                    <button class="btn m-l-2 button-page" :disabled="!hasNext" @click="changePage(page + 1)">Next</button>
                </div>
            </Transition>
        </div>
    
    </div>

    </div> 

</template>
<script setup>
//utils
import moment from "moment";

const { 
    getArticles, articles, articlesCount, articleIsLoading,
    getTags, tags, tagIsLoading,
    } = useArticles();

const route = useRoute();
const router = useRouter();

const limit = ref(10);
let page = computed(() => Number(route.query?.page) || 1)
let offset = computed(() => (page.value - 1) * limit.value)
let totalCount = computed(() => articlesCount.value ?? 0)
let hasNext = computed(() => totalCount.value >= limit.value)


function changePage(newPage) {
    const newPageInRange = newPage > page.value ? hasNext.value : newPage

  if (newPageInRange) {
    router.push({ query: { page: newPage } })
  }
}

getArticles({
    offset: offset.value,
    limit: limit.value
});

getTags();

watch(() => route.query.page, () => {
    getArticles({
        offset: offset.value,
        limit: limit.value
    });
});

</script>

<style scoped>
.button-page {
    background-color: #5cb85c;
    border-radius: 5px;
}
</style>

