<template>
    <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="submitArticle">
            <fieldset>
              <fieldset class="form-group">
                <input v-model="formData.title" type="text" class="form-control form-control-lg" placeholder="Article Title" />
              </fieldset>
              <fieldset class="form-group">
                <input v-model="formData.description" type="text" class="form-control" placeholder="What's this article about?" />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="formData.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="formData.tags" type="text" class="form-control" placeholder="Enter tags" />
                <div class="tag-list"></div>
              </fieldset>
              <button :disabled="articlesIsLoading" @click="submitArticle" class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const { create, articlesIsLoading } = useArticles();

const formData = reactive({
    title: undefined,
    description: undefined,
    body: undefined,
    tagList: []
});


async function submitArticle() {
  try {
    await create(formData)
  } catch(error) {
    console.log(error);
  }
}

</script>