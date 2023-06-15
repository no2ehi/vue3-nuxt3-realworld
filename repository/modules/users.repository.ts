import HttpFactory, { createFetchIstance } from '../factory';

import { AuthUserDTO, LoginFlowDTO, RegisterFlowDTO, toDomainUser, UserDTO } from './users.dto';
import { User } from '../models/user.model';
import { ApiResponse, ApiResponseFetch } from '../models/api.model';

const httpClient = createFetchIstance();

class UsersRepository {

  private BASE_PATH = '/users';
  
  async login(credentials: LoginFlowDTO): Promise<ApiResponseFetch<User>> {
    const result = await httpClient<ApiResponseFetch<User>>(
      `${this.BASE_PATH}/login`, 
    { 
      method: 'POST',
      body: credentials,
    });

    return {
      data: toDomainUser(result as UserDTO)
    };
  }


  async register(credentials: RegisterFlowDTO): Promise<ApiResponseFetch<User>> {
    const result = await httpClient<ApiResponseFetch<User>>(
      `${this.BASE_PATH}`, 
    { 
      method: 'POST',
      body: credentials,
    });

    return {
      data: toDomainUser(result as UserDTO)
    };
  }

}

export default UsersRepository;