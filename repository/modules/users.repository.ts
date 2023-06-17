import HttpFactory from '../factory';

import { LoginFlowDTO, RegisterFlowDTO, toDomainUser, UserDTO } from './users.dto';
import { User } from '../models/user.model';
import { ApiResponseFetch } from '../models/api.model';


class UsersRepository extends HttpFactory {

  private BASE_PATH = '/users';

  async login(credentials: LoginFlowDTO): Promise<ApiResponseFetch<User>> {
    const result = await this.call<ApiResponseFetch<User>>(
      'POST',
      `${this.BASE_PATH}/login`,
      credentials,
    );

    return {
      data: toDomainUser(result as UserDTO)
    }
  }


  async register(credentials: RegisterFlowDTO): Promise<ApiResponseFetch<User>> {
    const result = await this.call<ApiResponseFetch<User>>(
      'POST',
      this.BASE_PATH,
      credentials
    );

    return {
      data: toDomainUser(result as UserDTO)
    };
  }

}

export default UsersRepository;