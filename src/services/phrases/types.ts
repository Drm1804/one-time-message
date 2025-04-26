export type PhKeys = 'welcome_message';
type Func = (...args: Array<string | number>) => string;
export type LangStore = Record<PhKeys, Func | string>;
