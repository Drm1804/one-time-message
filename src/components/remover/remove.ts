import { BotContext, getBot } from '../../services/bot/bot';
import { logger } from '../../utils/logger';

const log = logger('Remover ');

const MESSAGE_TIMEOUT = 1000 * 60 * 5; // 5 minutes

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

type SendWithRemover = {
  ctx: BotContext;
  mes: string;
  chatId: number;
  timeout?: number;
};

export const sendWithRemover = (params: SendWithRemover): void => {
  const { ctx, mes, chatId, timeout } = params;
  ctx.api.sendMessage(chatId, mes).then(({ message_id }) => {
    remover(chatId, message_id, timeout);
  });
};
