import { Author } from "./articles.model"

export interface Comment {
    id: number
    body: string
    createdAt: Date
    updatedAt: Date
    author: Author
}

