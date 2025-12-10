import { debounce } from "es-toolkit";
import { useMemo } from "react";
import { useLatest } from "@/hooks/use-latest";
import { useUnmount } from "@/hooks/use-unmount";
import type { DebounceOptions } from "es-toolkit";

export type { DebounceOptions };

export function useDebounceFn<Fn extends (...args: unknown[]) => unknown>(
  fn: Fn,
  debounceMs?: number,
  options?: DebounceOptions,
) {
  const fnRef = useLatest(fn);

  const debouncedFn = useMemo(
    () =>
      debounce(
        (...args: Parameters<Fn>) => fnRef.current(...args),
        debounceMs ?? 1000,
        options,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useUnmount(() => debouncedFn.cancel());

  return {
    run: debouncedFn,
    cancel: debouncedFn.cancel,
    flush: debouncedFn.flush,
  };
}
