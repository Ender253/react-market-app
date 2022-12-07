import { createMemo } from "react-use";

const deepCompare = (memoFn, deeps) => {
    console.log(typeof memoFn, deeps);
    return memoFn();
  };
  
 export const useDeepMemo = createMemo(deepCompare);