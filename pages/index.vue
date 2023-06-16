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
                <a class="nav-link disabled" href="">Your Feed</a>
                </li>
                <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
                </li>
            </ul>
            </div>

        <Loading v-if="articlesIsLoading" color="#5cb85c" >loading Articles...</Loading>
        <!-- <div v-else-if="articlesError">{{ articlesError }}</div> -->
        <div v-else v-for="article in articles" :key="article.slug"  class="article-preview">
            {{ articlesCount }}
            <div class="article-meta">
                <a href="profile.html"><img src="{{ article.author.image }}" /></a>
                <div class="info">
                <a href="" class="author">{{ article.author.username }}</a>
                <span class="date">{{ article.createdAt }}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
            </div>
            <a href="" class="preview-link">
                <h1>{{ article.title }}</h1>
                <p>{{  article.description }}</p>
                <span>Read more...</span>
            </a>
            </div>
        </div>

        <div class="col-md-3">
            <div class="sidebar">
                <p>Popular Tags</p>

                <Loading v-if="tagIsLoading" color="#5cb85c">tags loading...</Loading>
                <!-- <div v-else-if="tagsError">{{ tagsError }}</div> -->
                <div v-else class="tag-list">
                    <li v-for="(tag, index) in tags" :key="index" class="tag-pill tag-default" >{{ tag }}</li>
                </div>
                </div>
            </div>
        </div>

        <div class="col-md-12">
            <Transition>
                <div v-if="page && !articlesIsLoading && !(page === 1 && !hasNext)" class="flex items-center justify-center gap-1 mt-4">
                    <button class="btn button-page" :disabled="articlesIsLoading || page === 1" @click="changePage(page - 1)">Previous</button>
                    <button class="btn m-l-2 button-page" :disabled="articlesIsLoading || !hasNext" @click="changePage(page + 1)">Next</button>
                </div>
            </Transition>
        </div>
    
    </div>

    </div> 

</template>
<script setup>
const { 
    get, articles, articlesCount, articlesIsLoading,
    getTags, tags, tagIsLoading,
    } = useArticles();

const { getToken } = useLogin();

const route = useRoute();
const router = useRouter();

const limit = ref(10);
let page = computed(() => Number(route.query?.page) || 1)

let offset = computed(() => (page.value - 1) * limit.value)
let totalCount = computed(() => articlesCount.value ?? 0)
let hasNext = computed(() => totalCount.value >= limit.value)

async function fetch() {
    const params = {
        offest: offset.value,
        limit: limit.value
    }
    try {
        await get(params);
    } catch (error) {
        console.log(error)
    }
}

fetch();

async function fetchTags() {
    try {
        await getTags();
    } catch(error) {
        console.log(error)
    }
}

fetchTags();


function changePage(newPage) {
  const newPageInRange = newPage > page.value ? hasNext.value : newPage

  if (newPageInRange) {
    router.push({ query: { page: newPage } })
  }
}

watch(() => route.query.page, () => {
    console.log(route.query.page);
    fetch()
})


</script>

<style scoped>
.button-page {
    background-color: #5cb85c;
    border-radius: 5px;
}
</style>