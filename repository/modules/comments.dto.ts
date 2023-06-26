import { Comment } from "../models/comment.model";
import { AuthorDTO, toDomainAuthor } from "./articles.dto";

export interface GetCommentSlug {
    slug: string
  }
  
  export interface CommentDTO {
    id: number
    body: string
    createdAt: Date
    updatedAt: Date
    author: AuthorDTO
  }
  
  export function toDomainComment(dto: CommentDTO): Comment {
    return {
      ...dto,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
      author: toDomainAuthor(dto.author),
    }
  }

export interface Comments {
  comments: CommentDTO[]
}

export interface CommentFlowDTO {
  comment: CommentDTO
}

export interface GetCommentParams {
  slug: string,
  comment: {
    body: string
  }
}

export interface GetDeleteCommentParams {
  slug: string,
  id: string
}

