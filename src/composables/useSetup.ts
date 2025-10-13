import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { AuthError } from '@/api/error';

export function useSetup<T, E = string>(
  setupFn: () => T | Promise<T>,
  errorTransform?: (e: unknown) => E,
) {
  const router = useRouter();

  const loading = ref(true);
  const error = ref<E | null>(null);
  const result = ref<T | null>(null);

  onMounted(async () => {
    try {
      result.value = await setupFn();
    } catch (e) {
      if (e instanceof AuthError) {
        router.push('/auth/signin');
      } else {
        console.error(e);
        error.value = errorTransform?.(e) ?? JSON.stringify(e);
      }
    } finally {
      loading.value = false;
    }
  });

  return { loading, error, result };
}
