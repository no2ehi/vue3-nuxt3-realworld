import { Comment } from "~/repository/models/comment.model";
import { GetCommentParams, GetDeleteCommentParams } from "~/repository/modules/comments.dto";

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

    async function sendUserComment(params: GetCommentParams) {
        return $api.comment.sendComment(params)
        .then(response => {
            return response;
        });
    }

    async function deleteUserComment(params: GetDeleteCommentParams) {
        return $api.comment.deleteComment(params)
        .then(response => {
            return response;
        });
    }

    return {
        getComments,
        sendUserComment,
        deleteUserComment,

        comments,
        commentsIsLoading
    }
}