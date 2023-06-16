// import { useToast } from 'vue-toastification'
import { ApiResponseFetch } from '~/repository/models/api.model';
import { LoginFlowDTO, RegisterFlowDTO } from '../repository/modules/users.dto';import { useApi } from './api.composable'
import { User } from '~/repository/models/user.model';
import UsersRepository from '~/repository/modules/users.repository';

const usersRepository = new UsersRepository();

export function useLogin() {

    const { startLoading, isLoading, endLoading } = useLoading();
    const userIsLoading = computed(() => isLoading.value );

    const username = useCookie('username');
    const token = useCookie('token');

    async function login(credentials: LoginFlowDTO) {
        startLoading();
        return usersRepository.login(credentials).then((response) => {
            username.value = response.data?.username;
            token.value = response.data?.token;
        }).finally(() => endLoading());
    }

    async function register(credentials: RegisterFlowDTO) {
        startLoading();
        return usersRepository.register(credentials).then((response) => {

            username.value = response.data?.username;
            token.value = response.data?.token;

            return token.value;
        }).finally( () => endLoading() );
    }

    const getToken = computed(() => {
        return useCookie('token');
    });

    const getUsername = computed(() => {
        return useCookie('username');
    })


    return {
        login,
        register,
        getToken,
        getUsername,
        userIsLoading
    }
}
