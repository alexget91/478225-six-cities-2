interface Action<T, P> {
  type: T,
  payload: P,
}

interface ActionCreator<T, P> {
  [name: string]: (status: P) => Action<T, P>
}

interface Reducer<T, P, S> {
  (state: S, action: Action<T, P>): S
}

export {Action, ActionCreator, Reducer};
