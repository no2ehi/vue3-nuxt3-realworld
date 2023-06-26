import { Comment } from "~/repository/models/comment.model";

export function useComments() {

    const { $api } = useNuxtApp();

    const { startLoading, isLoading, endLoading } = useLoading();

    const comments = ref<Comment[]>();
    const commentsIsLoading = computed(() => isLoading.value);

    async function getComments(slug: string) {
        startLoading();

        return $api.comment.getComments(slug)
        .then(response => {
            comments.value = response.comments as Comment[];

            return comments;
        })
        .finally(() => endLoading() );
    }

    return {
        getComments,

        comments,
        commentsIsLoading
    }
}