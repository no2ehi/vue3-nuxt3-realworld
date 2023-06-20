<template>
    <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <NuxtLink to="/register">Need an account?</NuxtLink>
          </p>
  
          <ul v-if="errors" class="error-messages">
            <li v-for="(error, index) in errors" :key="index">{{ index }} {{ error[0] }}</li>
          </ul>
  
          <form @submit.prevent="newLogin">
            <fieldset class="form-group">
              <input :disabled="userIsLoading" v-model="userData.email" class="form-control form-control-lg" type="text" placeholder="Email" />
            </fieldset>
            <fieldset class="form-group">
              <input :disabled="userIsLoading" v-model="userData.password" class="form-control form-control-lg" type="password" placeholder="Password" />
            </fieldset>
            <button :disabled="userIsLoading" class="btn btn-lg btn-primary pull-xs-right">
              <span>{{ userIsLoading ? 'loading...' : 'Login' }}</span>
              <Loading v-if="userIsLoading"></Loading>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLogin } from '~/composables/user.composable';

const {
      login,
      getToken,
      userIsLoading
     } = useLogin();

const userData = reactive({
  email: null,
  password: null,
});
const errors = ref([]);


async function newLogin() {
    try {
      const result = await login({
      user: userData
    });
        userData.password = '';
        navigateTo('/')
    } catch (error) {
        errors.value = error.data.errors;
        console.log(error)
    }
}

async function submitNew() {
  try {
       await login({
          user: userData
        });
        userData.password = '';
        navigateTo('/')
    } catch (error) {
        errors.value = error.data.errors;
    }
}

onMounted(() => getToken() && navigateTo('/') );

</script>