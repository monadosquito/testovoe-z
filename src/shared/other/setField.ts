const setProp = <O extends object, K extends keyof O>(k: K, v: O[K], o: O) => ({
  ...o,
  [k]: v,
});

export { setProp };
