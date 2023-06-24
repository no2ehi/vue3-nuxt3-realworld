<template>
    <nav class="navbar navbar-light">
      <div class="container">
        <NuxtLink to="/" class="navbar-brand">conduit</NuxtLink>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
              <NuxtLink class="nav-link" to="/">Home</NuxtLink>
          </li>
          <li v-if="checkToken" class="nav-item">
            <NuxtLink class="nav-link" to="/editor"><i class="ion-compose"></i>&nbsp;New Article </NuxtLink>
          </li>
          <li v-if="checkToken" class="nav-item">
            <NuxtLink class="nav-link" to="/settings"><i class="ion-gear-a"></i>&nbsp;Settings </NuxtLink>
          </li>
          <li v-if="!checkToken" class="nav-item">
            <NuxtLink class="nav-link" to="/login">Sign in</NuxtLink>
          </li>
          <li v-if="!checkToken" class="nav-item">
            <NuxtLink class="nav-link" to="/register">Sign up</NuxtLink>
          </li>
          <li v-if="checkToken" class="nav-item">
            <NuxtLink class="nav-link" :to="`/@${getUser.value.username}`">
              <img :src="getUser.value.image" class="user-pic" alt="image-profile" />
               {{ getUser.value.username }}
              </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script setup>
import { useLogin } from '~/composables/user.composable';

const { checkToken, getUser } = useLogin();

</script>