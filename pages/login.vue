<template>
    <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <NuxtLink to="/register">Need an account?</NuxtLink>
          </p>
  
          <ul v-if="userData.errors" class="error-messages">
            <li v-for="(error, index) in userData.errors" :key="index">{{ index }} {{ error[0] }}</li>
          </ul>
  
          <form @submit.prevent="submit">
            <fieldset class="form-group">
              <input :disabled="loading" v-model="userData.email" class="form-control form-control-lg" type="text" placeholder="Email" />
            </fieldset>
            <fieldset class="form-group">
              <input :disabled="loading" v-model="userData.password" class="form-control form-control-lg" type="password" placeholder="Password" />
            </fieldset>
            <button :disabled="loading" class="btn btn-lg btn-primary pull-xs-right">
              <span>{{ loading ? 'loading...' : 'Login' }}</span>
              <Loading v-if="loading"></Loading>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { loginUser } from '~/server/api';

const userData = reactive({
  username: null,
  email: null,
  password: null,
});

const loading = ref(false);

const useAuth = useAuthStore();

const submit = async () => {
  loading.value = true;
  const data = await loginUser(userData);
  loading.value = false;
  userData.password = null;

  if(data?.errors) {
    userData.errors = data.errors;
    return;
  };

  navigateTo('/');
}

onMounted(() => useAuth.isAuthenticated ? navigateTo('/') : '');
</script>