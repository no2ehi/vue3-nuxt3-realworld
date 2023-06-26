import HttpFactory from "../factory";
import { CommentDTO, Comments, toDomainComment } from "./comments.dto";

export class CommentsRepository extends HttpFactory {

    private BASE_PATH = `/articles`;

    async getComments(slug: string): Promise<Comments> {
        const result = await this.call<Comments>(
            'GET',
            `${this.BASE_PATH}/${slug}/comments`
        );

        return result;
    }

}