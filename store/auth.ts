import { defineStore } from "pinia";
import { userData } from "~/types/user";

export const useAuthStore = defineStore('auth', 
() => {
    
    const getToken = computed(() => {
        if (typeof window === 'undefined') return '';
        return localStorage.getItem('token') || '';
    });

    const getUser: ComputedRef<userData | null> = computed<userData | null>(() => {
        if (typeof window === 'undefined') return null;
        const userString = localStorage.getItem('user');
        if (userString) {
            return JSON.parse(userString) as userData;
          }
        return null;
      });
    
    const token = ref(getToken.value);
    const user: Ref<userData | null> = ref<userData | null>(getUser.value || null)

    function setToken(authToken: string) {
        if(!authToken) return;
        token.value = authToken;
        localStorage.setItem('token', authToken)
    }

    function setUser(userData: userData){
        if(!userData) return;
        user.value = userData;
        localStorage.setItem('user', JSON.stringify(userData))
    }

    function clearToken() {
        token.value = '';
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const isAuthenticated = computed(() => useCookie('token'));

    return {
        setToken,
        setUser,
        clearToken,
        isAuthenticated,
        getUser,
    }
});