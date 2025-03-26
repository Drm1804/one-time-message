import { Api, RawApi } from 'grammy';
import { getMessage, removeMessage } from '../../utils/database.js';
import { logger } from '../../utils/logger.js';
import { MessageStructure } from './types.js';

const log = logger('Reader Service');

const MESSAGE_TIMEOUT = 1000 * 1 * 5; // 5 minutes

export async function viewMessage(id: string): Promise<string> {
  log.info('readMessage');

  try {
    const message = await getMessage<MessageStructure>(id);
    await removeMessage(id);
    return message.text;
  } catch (error) {
    return 'Сообщение не существует или уже было прочитано';
  }
}

export function removeBotMessageFromChat(
  messageId: number,
  chatId: number | string,
  api: Api<RawApi>,
): void {
  // Simulate removing a message from a chat
  log.info(`Removing message ${messageId} from chat ${chatId}`);
  setTimeout(() => {
    log.info(`Message ${messageId} removed from chat ${chatId}`);
    api.deleteMessage(chatId, messageId);
  }, MESSAGE_TIMEOUT);
}
