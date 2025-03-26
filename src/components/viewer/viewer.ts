import { Api, RawApi } from 'grammy';
import { getMessage, removeMessage } from '../../utils/database.js';
import { logger } from '../../utils/logger.js';
import { MessageStructure } from './types.js';

const log = logger('Reader Service');

const MESSAGE_TIMEOUT = 1000 * 1 * 5; // 5 minutes

export async function viewMessage(
  id: string,
  api: Api<RawApi>,
  chatId: number,
): Promise<void> {
  log.info('readMessage');
  const text = await getOneTimeMessageText(id);
  await removeMessage(id);
  const { message_id } = await api.sendMessage(chatId, text);
  removeBotMessageFromChat(message_id, chatId, api);
}

async function getOneTimeMessageText(id: string): Promise<string> {
  try {
    const message = await getMessage<MessageStructure>(id);
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
  log.info(`Removing message ${messageId} from chat ${chatId}`);
  setTimeout(() => {
    log.info(`Message ${messageId} removed from chat ${chatId}`);
    try {
      api.deleteMessage(chatId, messageId);
    } catch (error) {
      log.error(
        `Error removing message ${messageId} from chat ${chatId}: ${error}`,
      );
      api.sendMessage(
        chatId,
        'Не получилось удалить сообщение, обязательно удалите его вручную',
      );
    }
  }, MESSAGE_TIMEOUT);
}
