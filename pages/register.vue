<template>
    <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <NuxtLink to="/login">Don't have an account?</NuxtLink>
          </p>
  
          <ul v-if="userData.errors" class="error-messages">
            <li v-for="(error, index) in userData.errors" :key="index">{{ index }} {{ error[0] }}</li>
          </ul>
          
          <form @submit.prevent="submit">
            <fieldset class="form-group">
              <input :disabled="loading" v-model="userData.username" class="form-control form-control-lg" type="text" placeholder="User Name" />
            </fieldset>
            <fieldset class="form-group">
              <input :disabled="loading" v-model="userData.email" class="form-control form-control-lg" type="text" placeholder="Email" />
            </fieldset>
            <fieldset class="form-group">
              <input :disabled="loading" v-model="userData.password" class="form-control form-control-lg" type="password" placeholder="Password" />
            </fieldset>
            <button :disabled="loading" class="btn btn-lg btn-primary pull-xs-right">
              <span>{{ loading ? 'loading...' : 'Sign up' }}</span>
              <Loading v-if="loading"></Loading>
            </button>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { registerUser } from '~/server/api';


const userData = reactive({
  username: null,
  email: null,
  password: null,
  errors: null,
});

const useAuth = useAuthStore();

const loading = ref(false);

const submit = async () => {
  loading.value = true;
  const data = await registerUser(userData);
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