import { createMemo } from "react-use";

const deepCompare = (a,b) => {
    console.log(a,b);
    return a;
  };
  
 export const useDeepMemo = createMemo(deepCompare);