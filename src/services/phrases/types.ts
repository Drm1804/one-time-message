export type PhKeys =
  | 'welcome_message'
  | 'not_chat_warning'
  | 'participants_count_error'
  | 'message_not_found';
type Func = (...args: Array<string | number>) => string;
export type LangStore = Record<PhKeys, Func | string>;
