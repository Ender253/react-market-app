import { useRef } from 'react';
import { isEqual } from 'lodash';

export function useDeepMemo(
    memoFn,
    key
  ) {
    const ref = useRef();
  
    if (!ref.current || !isEqual(key, ref.current.key)) {
      ref.current = { key, value: memoFn() };
    }
  
    return ref.current.value;
  }