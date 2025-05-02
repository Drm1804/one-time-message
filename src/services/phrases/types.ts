export type PhKeys =
  | 'welcome_message'
  | 'not_chat_warning'
  | 'message_impossible_remove'
  | 'participants_count_error'
  | 'message_not_found'
  | 'otm_link_message'
  | 'message_rate_limit';
type Func = (...args: Array<string | number>) => string;
export type LangStore = Record<PhKeys, Func | string>;
