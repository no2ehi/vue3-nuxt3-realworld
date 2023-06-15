import { onUnmounted, UnwrapRef } from 'vue'
import { RefValue } from 'vue/macros'
// import { useToast } from 'toas'
import { ApiResponse } from '../repository/models/api.model';
import { parseErrors } from '../utils/parseError';

export type ApiActionFn<T, U> = (input: T, signal: AbortSignal) => Promise<ApiResponse<U>>

export type ApiActionCallback<T> = (data: T | undefined) => any

export function useApi<T, U>(action: ApiActionFn<T, U>, callback?: ApiActionCallback<U>, notify = true) {
  let cancelController = ref<AbortController | undefined>()

  let data = ref<U | undefined>()
  let loading = ref(false)

  async function attempt(input: T, abortController?: AbortController) {
    if (cancelController) cancelController.value?.abort()

    cancelController.value = abortController && !abortController.signal.aborted ? abortController : new AbortController()

    loading.value = true

    try {
      const result = await action(input, cancelController.value.signal)

      data.value = Object.assign({}, result) as RefValue<U | undefined>

      if (callback) callback(result.data)
      return {data: result};
    } catch (err: any) {
      if (notify && err?.errors && err?.errors?.message?.[0] !== 'canceled') {
        // const toast = useToast()
        console.log('err comoposable', err.errors)
        // parseErrors(err.errors).forEach((err) => toast.error(err))
      }

      return Promise.reject(err)
    } finally {
      loading.value = false
    }
  }

  onUnmounted(() => {
    cancelController.value?.abort()
  })

  return {
    attempt,
    loading,
    data,
    abortController: cancelController
  }
}
