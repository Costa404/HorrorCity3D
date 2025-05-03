let removeLifeFn: ((amount: number) => void) | null = null;

export const setRemoveLifeFn = (fn: (amount: number) => void) => {
  removeLifeFn = fn;
};

export const removeLife = (amount: number) => {
  if (removeLifeFn) {
    removeLifeFn(-Math.abs(amount));
  } else {
    console.warn("removeLifeFn ainda não foi definido!");
  }
};
