<template>
    <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <NuxtLink to="/login">Don't have an account?</NuxtLink>
          </p>
  
          <ul v-if="errors" class="error-messages">
            <li v-for="(error, index) in errors" :key="index">{{ index }} {{ error[0] }}</li>
          </ul>
          
          <form @submit.prevent="submit">
            <fieldset class="form-group">
              <input :disabled="userIsLoading" v-model="userData.username" class="form-control form-control-lg" type="text" placeholder="User Name" />
            </fieldset>
            <fieldset class="form-group">
              <input :disabled="userIsLoading" v-model="userData.email" class="form-control form-control-lg" type="text" placeholder="Email" />
            </fieldset>
            <fieldset class="form-group">
              <input :disabled="userIsLoading" v-model="userData.password" class="form-control form-control-lg" type="password" placeholder="Password" />
            </fieldset>
            <button :disabled="userIsLoading" class="btn btn-lg btn-primary pull-xs-right">
              <span>{{ userIsLoading ? 'loading...' : 'Sign up' }}</span>
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
      register,
      checkToken,
      userIsLoading
     } = useLogin();

const userData = reactive({
  username: null,
  email: null,
  password: null,
});

const errors = ref([]);

async function submit() {
  try {
       const data = await register({
          user: userData
        });
        userData.password = '';
        if( !data ) return;
        
        reloadNuxtApp({
          path: "/",
        });
    } catch (error) {
        errors.value = error.data.errors;
    }
}

onMounted(() => checkToken.value && navigateTo('/') );

</script>