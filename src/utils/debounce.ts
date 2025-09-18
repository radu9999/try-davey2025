import { ChangeEvent } from "react";

type DebouncedFunction<
  T extends (...args: ChangeEvent<HTMLInputElement>[]) => void
> = (...args: Parameters<T>) => void;

function debounce<T extends (...args: ChangeEvent<HTMLInputElement>[]) => void>(
  func: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default debounce;
