export function selectFromRoot<
  RootState,
  LocalState,
  Args extends any[],
  Return
>(
  sliceSelector: (state: RootState) => LocalState,
  localSelector: (state: LocalState, ...args: Args) => Return
): (state: RootState, ...args: Args) => Return {
  return (state, ...args) => localSelector(sliceSelector(state), ...args);
}

export function delay(ms: number) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}
