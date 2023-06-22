<template>

<div class="settings-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form @submit.prevent="updateSetting">
          <fieldset>
            <fieldset class="form-group">
              <input v-model="formData.image" :disabled="userIsLoading" class="form-control" type="text" placeholder="URL of profile picture" />
            </fieldset>
            <fieldset class="form-group">
              <input v-model="formData.username" :disabled="userIsLoading" class="form-control form-control-lg" type="text" placeholder="Your Name" />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                v-model="formData.bio"
                :disabled="userIsLoading"
                class="form-control form-control-lg"
                rows="8"
                placeholder="Short bio about you"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input 
              v-model="formData.email"
              :disabled="userIsLoading" class="form-control form-control-lg" type="text" placeholder="Email" />
            </fieldset>
            <fieldset class="form-group">
              <input 
              v-model="formData.password"
              :disabled="userIsLoading"
               class="form-control form-control-lg"
                type="password"
                 placeholder="Password" />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
                <span>
                    {{ buttonType }}
                </span>
                <Loading v-if="userIsLoading" />
            </button>
          </fieldset>
        </form>
        <hr />
        <button class="btn btn-outline-danger">Or click here to logout.</button>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
import { useLogin } from '~/composables/user.composable';

const { updateUser, getCurrentUser, userIsLoading } = useLogin();

const formData = ref({
    username: undefined,
    email: undefined,
    image: undefined,
    bio: undefined,
    password: undefined,
});

async function fetchUser() {
    try {
        formData.value = await getCurrentUser();
    } catch (error) {
        
    }
}

async function updateSetting() {
    try {
        await updateUser({
            user: {
                username: formData.value.username,
                email: formData.value.email,
                image:formData.value.image,
                bio: formData.value.bio,
                password: formData.value.password
            }
        });
        
    } catch (error) {
        console.log(error);
    }
}

const buttonType = computed(() => {
    return  userIsLoading.value ? 'Loading...' : 'Update Settings';
});

onMounted(() => {
    fetchUser();
});
</script>