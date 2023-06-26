import HttpFactory from "../factory";
import { Comment } from "../models/comment.model";
import { CommentFlowDTO, Comments, GetCommentParams, GetDeleteCommentParams, toDomainComment } from "./comments.dto";

export class CommentsRepository extends HttpFactory {

    private BASE_PATH = `/articles`;

    async getComments(slug: string): Promise<Comments> {
        const result = await this.call<Comments>(
            'GET',
            `${this.BASE_PATH}/${slug}/comments`
        );

        return result;
    }

    async sendComment({ slug, comment}: GetCommentParams): Promise<Comment> {
        const result = await this.call<CommentFlowDTO>(
            'POST',
            `${this.BASE_PATH}/${slug}/comments`,
            {comment}
        );

        return toDomainComment(result.comment);
    }

    async deleteComment({slug, id}: GetDeleteCommentParams): Promise<undefined> {
        return await this.call<undefined>(
            'DELETE',
            `${this.BASE_PATH}/${slug}/comments/${id}`
        );
    }

}