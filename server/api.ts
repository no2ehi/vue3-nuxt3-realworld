import { useAuthStore } from "../composables/auth";
import { userData } from "../types/user";

export const BASE_URL = 'https://api.realworld.io/api';

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

interface paramsArticleType {
    tag?: string
    author?: string
    favorited?: string
    offset?: string
    limit?: string
}


export const fetchListArticles = async (params: paramsArticleType) => {
    const { 
        tag,
        author,
        favorited,
        offset,
        limit
     } = params;
    const query = {
        tag,
        author,
        favorited,
        offset,
        limit
      }
    return await $fetch(`${BASE_URL}/articles/`, { query })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log('err', error);
            })
}