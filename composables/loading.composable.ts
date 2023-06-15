import { ref, computed } from 'vue';

export function useLoading() {
    let loading = ref(0);

    const startLoading = () => {
        loading.value++;
    };

    const endLoading = () => {
        loading.value--;
    };

    const isLoading = computed(() => {
        return !!loading.value;
    });

    return {
        startLoading,
        endLoading,
        isLoading
    };
}
