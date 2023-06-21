import { LoginFlowDTO, RegisterFlowDTO } from '../repository/modules/users.dto';
import UsersRepository from '~/repository/modules/users.repository';

export function useLogin() {

    const { $api } = useNuxtApp();
    const { startLoading, isLoading, endLoading } = useLoading();

    const userIsLoading = computed(() => isLoading.value );
    const username = useCookie('username');
    const token = useCookie('token');

    async function login(credentials: LoginFlowDTO) {
        startLoading();

        return $api.auth.login(credentials)
        .then((response) => {
            username.value = response.data?.username;
            token.value = response.data?.token;
        })
        .finally(() => endLoading())
    }

    async function register(credentials: RegisterFlowDTO) {
            startLoading();
            return $api.auth.register(credentials)
            .then((response) => {
                username.value = response.data?.username;
                token.value = response.data?.token;

                return token.value
            })
            .finally(() => endLoading());
        }

    function getToken() {
        return token.value;
    }

    function setToken(value: string) {
        token.value = value;
    }

    const checkToken = computed(() => token.value);
    const getUsername = computed(() => username.value);


    return {
        login,
        register,
        getToken,
        setToken,
        checkToken,
        getUsername,
        userIsLoading,
    }
}
