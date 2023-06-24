import { ProfileUser, User } from '~/repository/models/user.model';
import { LoginFlowDTO, RegisterFlowDTO, UserDTO } from '../repository/modules/users.dto';

export function useLogin() {

    const { $api } = useNuxtApp();
    const { startLoading, isLoading, endLoading } = useLoading();

    const userIsLoading = computed(() => isLoading.value );
    const profile = ref<ProfileUser>();
    const user = useCookie<User | null>('user');
    const token = useCookie('token');

    async function login(credentials: LoginFlowDTO) {
        startLoading();

        return $api.auth.login(credentials)
        .then((response) => {
            user.value = response.data || null;
            token.value = response.data?.token;
        })
        .finally(() => endLoading())
    }

    async function register(credentials: RegisterFlowDTO) {
        startLoading();
        return $api.auth.register(credentials)
        .then((response) => {
            user.value = response.data || null;
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
    const getUser = computed(() => user )


    return {
        login,
        register,
        getToken,
        setToken,
        updateUser,
        getCurrentUser,
        getProfile,
        getUser,
        profile,
        checkToken,
        userIsLoading,
    }
}
