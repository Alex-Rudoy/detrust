export const hasValue = (a: unknown): a is NonNullable<unknown> =>
  a !== null && a !== undefined;
