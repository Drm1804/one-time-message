import { getBot } from '../../services/bot.js';
import { logger } from '../../utils/logger.js';

const log = logger('Remover ');

const MESSAGE_TIMEOUT = 1000 * 1 * 5; // 5 minutes

export const remover = async (
  chatId: number,
  messageId: number,
  timeout: number = MESSAGE_TIMEOUT,
): Promise<void> => {
  setTimeout(async () => {
    log.info(`Message ${messageId} removed from chat ${chatId}`);
    const bot = getBot();

    try {
      await bot.api.deleteMessage(chatId, messageId);
    } catch (error) {
      log.error(
        `Error removing message ${messageId} from chat ${chatId}: ${error}`,
      );
      bot.api.sendMessage(
        chatId,
        'Не получилось удалить сообщение, возможно вы написали боту в личные сообщения, или бот не админ группы, обязательно удалите его вручную',
      );
    }
  }, timeout);
};
