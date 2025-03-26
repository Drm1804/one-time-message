export type PhKeys = 'updateTlgProgress';
type Func = (...args: Array<string | number>) => string;
export type LangStore = Record<PhKeys, Func | string>;
