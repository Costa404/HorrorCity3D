let removeLifeFn: ((amount: number) => void) | null = null;

export const setRemoveLifeFn = (fn: (amount: number) => void) => {
  removeLifeFn = fn;
};

export const removeLife = (amount: number) => {
  console.log("🔔 removeLife chamado com amount:", amount);
  if (removeLifeFn) {
    console.log("✅ removeLifeFn existe, a chamar função...");
    removeLifeFn(-Math.abs(amount));
  } else {
    console.warn("❌ removeLifeFn ainda não foi definido!");
  }
};
