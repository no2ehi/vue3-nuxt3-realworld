export interface User {
    username: string
    email: string
    token?: string
    image?: string
    bio?: string
  }
  
export interface ProfileUser {
  username: string,
  bio?: string | null,
  image?: string | null,
  following: boolean
}