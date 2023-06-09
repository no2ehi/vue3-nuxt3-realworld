import { useAuthStore } from "../composables/auth";
import { userData } from "../types/user";

const BASE_URL = 'https://api.realworld.io/api';

export const loginUser = async ({email, password}: userData) => {
    return await $fetch<apiResponse>(`${BASE_URL}/users/login`, {
        method: "POST",
        body: {
            user: {
                email,
                password
            }
        },
    })
    .then(response => {
        console.log(response)
        const useAuth = useAuthStore();
        useAuth.setToken(response.user.token);
        useAuth.setUser(response.user);
        return response.user.token;
    })
    .catch(error => {
        return error.data;
    });
}

export const registerUser = async ({username, email, password}: userData) => {
    return await $fetch<apiResponse>(`${BASE_URL}/users/`, {
        method: "POST",
        body: {
            user: {
                username,
                email,
                password
            }
        },
    })
    .then(response => {
        const useAuth = useAuthStore();
        useAuth.setToken(response.user.token);
        useAuth.setUser(response.user);
        return response.user.token;
    })
    .catch(error => {
        return error.data;
    });
}