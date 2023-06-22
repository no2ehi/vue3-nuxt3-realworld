<template>
<div class="profile-page">
  <div  class="user-info">
    <div class="container">
      <div class="row">
        <Loading v-if="userIsLoading" color="#5cb85c">Loading Profile</Loading>
        <div v-else class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{ profile.username }}</h4>
          <p>
            {{ profile.bio }}
          </p>

        <NuxtLink v-if="checkToken" to="/settings">
          <button  class="btn btn-sm btn-outline-secondary action-btn">
            <i class="ion-plus-round"></i>
            &nbsp; Edit Profile Settings
          </button>
        </NuxtLink>

          <button v-else class="btn btn-sm btn-outline-secondary action-btn">
            <i class="ion-plus-round"></i>
            &nbsp; Follow {{ profile.username }}
          </button>

        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
        
      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link active" href="">My Articles</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Favorited Articles</a>
            </li>
          </ul>
        </div>

        <Loading v-if="userIsLoading && articleIsLoading" color="#5cb85c">Loading Articles</Loading>
        <template v-else >
            <div v-for="article in articles" :key="article.slug" class="article-preview">
                <div class="article-meta">
                    <NuxtLink :to="`/@${article.author.username}`"><img :src="article.author.image" /></NuxtLink>
                    <div class="info">
                    <NuxtLink :to="`/@${article.author.username}`" class="author">{{ article.author.username }}</NuxtLink>
                    <span class="date">{{ moment(article.createdAt).format('LL') }}</span>
                    </div>
                    <button class="btn btn-outline-primary btn-sm pull-xs-right">
                    <i class="ion-heart"></i> {{ article.favoritesCount }}
                    </button>
                </div>
                <NuxtLink :to="`/article/${article.slug}`" class="preview-link">
                    <h1>{{ article.title }}</h1>
                    <p>{{  article.body }}</p>
                    <span>Read more...</span>
                </NuxtLink>
            </div>
        </template>

      </div>
    </div>
  </div>
</div>
</template>

<script setup>
// Utils
import moment from 'moment';

import { useLogin } from '~/composables/user.composable';

const { getProfile, userIsLoading, profile, checkToken } = useLogin();
const { get: getArticles, articleIsLoading, articles, articlesCount } = useArticles();

const route = useRoute();

async function getProfileUser() {
    try {
        await getProfile(route.params.slug);
    } catch (error) {
        console.log(error)
    }
}

async function getArticlesUser() {
    try {
        const params = {
            author: route.params.slug,
            offest: 0,
            limit: 5,
        }
        await getArticles(params);
    } catch (error) {
        console.log(error);
    }
}

getProfileUser();
getArticlesUser();

</script>