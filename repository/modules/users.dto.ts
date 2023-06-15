import { User } from "../models/user.model"


export interface RegisterCredentials {
    username: string
    email: string
    password: string
  }

  export type LoginCredentials = Omit<RegisterCredentials, 'username'>


  export interface LoginFlowDTO {
    user: Omit<RegisterCredentials, 'username'>
  }
  
  export interface RegisterFlowDTO {
    user: RegisterCredentials
  }
  
  export interface UserDTO {
    user: {
      username: string
      email: string
      token: string | null
      image: string | null
      bio: string | null
    }
  }

  export function toDomainUser(dto: UserDTO): User {
    return {
      username: dto.user.username,
      email: dto.user.email,
      token: dto.user.token ? dto.user.token : undefined,
      image: dto.user.image ? dto.user.image : undefined,
      bio: dto.user.bio ? dto.user.bio : undefined
    }
  }


  export interface AuthUserDTO {
    user: UserDTO
  }
  
  export function toDomainAuthUser(dto: AuthUserDTO): User {
    return toDomainUser(dto.user)
  }