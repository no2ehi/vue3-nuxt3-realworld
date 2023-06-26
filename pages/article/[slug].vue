<template>
<Loading v-if="articleIsLoading" color="#5cb85c">Loading Article</Loading>
<div v-else class="article-page">
  <div class="banner">
    <div class="container">
      <h1>{{ article.title }}</h1>

      <div class="article-meta">
        <NuxtLink :to="`/@${article.author.username}`"><img :src="article.author.image" :alt="article.author.username"/></NuxtLink>
        <div class="info">
          <NuxtLink :to="`/@${article.author.username}`">{{ article.author?.username }}</NuxtLink>
          <span class="date">{{ moment(article.createdAt).format('LL') }}</span>
        </div> 

        <button 
          v-if="checkToken"
          @click="editArticle"
          class="btn btn-sm btn-outline-secondary">
          Edit Article
        </button>

        <button v-else class="btn btn-sm btn-outline-secondary">
          <i class="ion-plus-round"></i>
          &nbsp; Follow {{ article.author?.username}} <span class="counter">(10)</span>
        </button>
        &nbsp;&nbsp;

        <button 
          v-if="checkToken"
          @click="removeArticle"
          class="btn btn-outline-danger btn-sm">
          Delete Article
        </button>

        <button v-else class="btn btn-sm btn-outline-primary">
          <i class="ion-heart"></i>
          &nbsp; Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
        </button>

      </div>
    </div>
  </div>

  <div class="container page">
    <div class="row article-content">
      <div class="col-md-12">
        {{ article.body }}
      </div>
      <ul class="tag-list m-t-2">
        <li v-for="tag in article.tagList" class="tag-default tag-pill tag-outline">
              {{ tag }}
        </li>
      </ul>
    </div>

    <hr />

    <div class="article-actions">
      <div class="article-meta">
        <NuxtLink :to="`/@${article.author.username}`"><img :src="article.author.image" :alt="article.author.username"/></NuxtLink>
        <div class="info">
          <NuxtLink :to="`/@${article.author.username}`">{{ article.author?.username }}</NuxtLink>
          <span class="date">{{ moment(article.createdAt).format('LL') }}</span>
        </div>

        <button class="btn btn-sm btn-outline-secondary">
          <i class="ion-plus-round"></i>
          &nbsp; Follow {{ article.author?.username }}
        </button>
        &nbsp;
        <button class="btn btn-sm btn-outline-primary">
          <i class="ion-heart"></i>
          &nbsp; Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
        </button>
      </div>
    </div>


    <!-- TODO -->
    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2">
        <form class="card comment-form">
          <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
          </div>
          <div class="card-footer">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
            <button class="btn btn-sm btn-primary">Post Comment</button>
          </div>
        </form>

        <Loading v-if="commentsIsLoading" color="#5cb85c">Loading Comment...</Loading>

        <template v-else>
          <div v-if="comments.length">
          
          <div v-for="comment in comments" class="card">
            <div class="card-block">
              <p class="card-text">
                {{ comment.body }}
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img :src="comment.author.image" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">{{ comment.author.username }}</a>
              <span class="date-posted">{{ moment(comment.createdAt).format('LL') }}</span>
            </div>
          </div>
        </div>
          <div v-else>
            There is no comment!
          </div>
        </template>

      </div>
    </div>
  </div>
</div>
</template>


<script setup>
// Compsables
import { useLogin } from "~/composables/user.composable";
import { useComments } from "~/composables/comments.compsables";
// import { useArticles } from "~/composables/articles.compsables";

//utils
import moment from "moment";

const { checkToken } = useLogin();
const { getBySlug, deleteArticle, articleIsLoading, article } = useArticles();
const { getComments, commentsIsLoading, comments } = useComments();

const route = useRoute();

getBySlug(route.params.slug);

getComments(route.params.slug);

function editArticle() {
  navigateTo(`/editor/${article.value.slug}`);
}

async function removeArticle() {
  try {
    deleteArticle(article.value.slug);
    
    navigateTo('/');
  } catch (error) {
    console.log(error);
  }
}

</script>