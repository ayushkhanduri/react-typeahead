import { useCallback, useRef } from "react"

export const useDebounceCallback = (func: (args: any) => void, timer: number) => {
    const timeout = useRef<NodeJS.Timeout>(null);
    const debounce = useCallback((...args: readonly [any]) => {
        clearTimeout(timeout.current as NodeJS.Timeout);
        timeout.current = setTimeout(() => {
            clearTimeout(timeout.current as NodeJS.Timeout);
            func(...args);
        }, timer);
    }, [func, timer]);
    return debounce;
}
