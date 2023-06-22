import { ProfileUser } from '~/repository/models/user.model';
import { LoginFlowDTO, RegisterFlowDTO, UserDTO } from '../repository/modules/users.dto';
import UsersRepository from '~/repository/modules/users.repository';

export function useLogin() {

    const { $api } = useNuxtApp();
    const { startLoading, isLoading, endLoading } = useLoading();

    const userIsLoading = computed(() => isLoading.value );
    const username = useCookie('username');
    const profile = ref<ProfileUser>();
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

    async function getCurrentUser() {
        startLoading();

        return $api.auth.getUser()
        .then((response) => {
            return response;
        })
        .finally(() => endLoading())
    }

    async function updateUser(userEdited: UserDTO) {
        startLoading();

        return $api.auth.updateSetting(userEdited)
        .then((response) => {
            return response;
        })
        .finally(() => endLoading())
    }

    async function getProfile(username: string) {
        startLoading();

        return $api.auth.getProfileUser(username)
        .then((response) => {
            profile.value = response;
            return profile;
        })
        .finally(() => endLoading())
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
        updateUser,
        getCurrentUser,
        getProfile,
        profile,
        checkToken,
        getUsername,
        userIsLoading,
    }
}
