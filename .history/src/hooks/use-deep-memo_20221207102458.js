import { useRef } from 'react';
import { isEqual } from 'lodash';

export function useDeepMemo(
    memoFn,
    key
  ) {
    const ref = useRef();
  
    if (!ref.current || !isEqual(key, ref.current.key)) {
        console.log('re-calculate');
      ref.current = { key, value: memoFn() };
    }
  
    return ref.current.value;
  }