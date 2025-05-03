import { BotContext, getBot } from '../../services/bot/bot.js';
import { logger } from '../../utils/logger.js';
import { getText } from '../../services/phrases/phrases.js';
import { LanguageCode } from 'grammy/types';
import { lang } from '../../utils/utils.js';

const log = logger('Remover ');

const MESSAGE_TIMEOUT = 1000 * 60 * 5; // 5 minutes

export const remover = async (
  chatId: number,
  messageId: number,
  lang: LanguageCode,
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
      bot.api.sendMessage(chatId, getText('message_impossible_remove', lang));
    }
  }, timeout);
};

type SendWithRemover = {
  ctx: BotContext;
  mes: string;
  chatId: number;
  timeout?: number;
};

export const sendWithRemover = (
  params: SendWithRemover,
  tgParams?: Record<string, string>,
): void => {
  const { ctx, mes, chatId, timeout } = params;
  ctx.api.sendMessage(chatId, mes, tgParams).then(({ message_id }) => {
    remover(chatId, message_id, lang(ctx), timeout);
  });
};
