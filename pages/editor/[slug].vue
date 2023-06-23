<template>
    <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="submitArticle">
            <fieldset>
              <fieldset class="form-group">
                <input :disabled="articlesIsLoading" v-model="formData.title" type="text" class="form-control form-control-lg" placeholder="Article Title" />
              </fieldset>
              <fieldset class="form-group">
                <input :disabled="articlesIsLoading" v-model="formData.description" type="text" class="form-control" placeholder="What's this article about?" />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="formData.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  :disabled="articlesIsLoading"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input 
                :disabled="articlesIsLoading"
                  v-model="formData.newTag"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keyup.enter="addTags"
                     />
                <div class="tag-list">
                  <div v-for="tag in formData.tagList" :key="tag" class="tag-pill tag-default">
                    <i @click="removeTag(tag)">&#x2716;</i>
                    {{ tag }}
                  </div>
                </div>
              </fieldset>
              <button :disabled="articlesIsLoading" @click="submitArticle" class="btn btn-lg pull-xs-right btn-primary" type="button">
                <span>
                  {{ buttonType }}
                </span>
                <Loading v-if="articlesIsLoading" />
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const {update, getBySlug, article, articlesIsLoading } = useArticles();

const formData = ref({
    title: undefined,
    description: undefined,
    body: undefined,
    tagList: [],
    newTag: undefined,
});

function addTags() {
  if(! formData.value.newTag) return;

  if(!formData.value.tagList.includes(formData.value.newTag)) {
    formData.value.tagList.push(formData.value.newTag);
  }

  formData.value.newTag = '';
}

function removeTag(selectedTag) {
  formData.value.tagList = formData.value.tagList.filter(tag => tag !== selectedTag)
}

async function submitArticle() {
  try {
    const result = await update(
      formData.value.slug,
      {
        title: formData.value.title,
        description: formData.value.description,
        body: formData.value.body,
        tagList: formData.value.tagList,
      }
    );
    if(!result.slug) return;

      formData.value = {
        title: '',
        description: '',
        body: '',
        tagList: []
      }

      navigateTo(`/article/${result.slug}`);
  } catch(error) {
    console.log(error);
  }
}

const buttonType = computed(() => {
    return  articlesIsLoading.value ? 'Loading...' : route.params.slug ? 'Edit Article' : 'Publish Article';
})

onMounted(async () => {
    if(route.params.slug) {
       try {
            const result = await getBySlug(route.params.slug);

            formData.value = result;
       } catch (error) {
            console.log(error)
       }
    }
})

</script>