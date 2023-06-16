import { FetchOptions } from 'ofetch';
// import { useAuthStore } from '~/store/auth';


export function injectToken(config: FetchOptions) {

    // const { isAuthenticated } = useAuthStore();

    // if(isAuthenticated.value) {

    //     config.headers = {
    //         ...config.headers,
    //         Authorization: `Bearer ${isAuthenticated.value}`
    //     }
    // }

    return config;
}